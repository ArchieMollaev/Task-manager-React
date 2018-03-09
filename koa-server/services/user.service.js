import Boom from 'boom';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ORMconnect from '../ORMconnect';

class UserService {
  constructor(repository) {
    this.User = repository.User;
    this.Column = repository.Column;
    this.Card = repository.Card;
    this.response = {
      signUp(bool) {
        return bool
          ? { success: true }
          : Boom.conflict('user with email already exist').output.payload;
      },
      login(token) {
        return token
          ? { token }
          : Boom.unauthorized('invalid credentials').output.payload;
      },
      badRequest() {
        return Boom.badRequest('invalid query').output.payload;
      },
      serverUnavailable() {
        return Boom.serverUnavailable('failed to write to database').output.payload;
      },
    };
    this.decodeToken = token => (
      jwt.verify(
        token.split(' ')[1], 'secret_word',
        (err, decoded) => (err ? null : decoded),
      )
    );
  }

  createNewUser({ login, email, password }) {
    if (login && email && password) {
      return this.User.findOrCreate({
        where: { email },
        defaults: {
          login,
          email,
          password: bcrypt.hashSync(password, 10),
        },
      })
        .spread((user, created) => (
          // user.get({ plain: true });
          this.response.signUp(created)
        ));
    }
    return this.response.badRequest();
  }

  login({ login, password }) {
    if (login && password) {
      return this.User.findOne({ where: { login } })
        .then((result) => {
          if (result) {
            const parsedData = JSON.parse(JSON.stringify(result));
            if (bcrypt.compareSync(password, parsedData.password)) {
              const token = jwt.sign(parsedData, 'secret_word', {
                expiresIn: '30m',
              });
              return this.response.login(token);
            }
          }
          return this.response.login();
        })
        .catch(() => this.response.serverUnavailable());
    }
    return this.response.badRequest();
  }

  validateLogin({ login }) {
    if (login) {
      return this.User.findOne({ where: { login } })
        .then(result => !result);
    }
    return this.response.badRequest();
  }

  getData(token) {
    const { login } = this.decodeToken(token);
    if (login) {
      return this.User.findOne({
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
      })
        .then(result => (
          result ? { userData: result.Columns } : this.response.badRequest()
        ))
        .catch(() => this.response.serverUnavailable());
    }
    return this.response.badRequest();
  }
}

export default new UserService(ORMconnect);
