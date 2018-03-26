import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Conflict, Unauthorized, NotFound, BadRequest, ServerUnavailable } from '../core/exceptions';
import ORM from '../ORMconnect';

class UserService {
  constructor({ models }) {
    this.User = models.User;
    this.Column = models.Column;
    this.Card = models.Card;
  }

  validateLoginName = async ({ login }) => {
    if (!login) throw new BadRequest();
    const res = await this.User.findOne({ where: { login } });
    if (res) throw new Conflict('login already exists');
    return !res;
  }

  create = async ({ login, email, password }) => {
    if (!login || !email || !password) throw new BadRequest();
    await this.validateLoginName({ login });
    const res = await this.User.findOrCreate({
      where: { email },
      defaults: {
        login,
        email,
        password: bcrypt.hashSync(password, 10),
      },
      row: true,
    });
    if (!res[1]) throw new Conflict('user with email already exists');
    return res[0];
  }

  authorization = async ({ login, password }) => {
    if (!login || !password) throw new BadRequest();
    const res = await this.User.findOne({ where: { login }, raw: true });
    if (!res || !bcrypt.compareSync(password, res.password)) throw new Unauthorized();
    const userData = await this.getData(login);
    const token = jwt.sign(res, 'secret_word', {
      expiresIn: '30m',
    });
    return { ...userData, token };
  }

  getData = async (login) => {
    const res = await this.User.findOne({
      where: { login },
      include: [
        {
          model: this.Column,
          attributes: ['id', 'name'],
          as: 'Columns',
          include: [
            {
              model: this.Card,
              attributes: ['id', 'position', 'title', 'description'],
              as: 'Cards',
            },
          ],
        },
      ],
      order: [
        [
          { model: this.Column, as: 'Columns' },
          { model: this.Card, as: 'Cards' },
          'position', 'ASC',
        ],
      ],
    });
    return { data: res.Columns };
  }
}

export default new UserService(ORM);
