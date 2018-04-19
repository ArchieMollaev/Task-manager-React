import { NotFound, BadRequest } from '../core/exceptions';
import ORM from '../ORMconnect';

class ColumnService {
  constructor({ models }) {
    this.Column = models.Column;
  }

  create = async (UserId, { name }) => {
    if (!name) throw new BadRequest();
    const data = await this.Column.create({
      name,
      UserId,
    });
    return data;
  }

  remove = async (UserId, id) => {
    if (!UserId || !id) throw new BadRequest();
    const res = await this.Column.destroy({
      where: {
        id,
        UserId,
      },
    });
    if (res) return res;
    throw new NotFound();
  }

  rename = async (UserId, id, { name }) => {
    if (!id || !name) throw new BadRequest();
    const res = await this.Column.findOne({
      where: {
        id,
        UserId,
      },
    });
    if (!res) throw new NotFound();
    const data = await res.update({ name });
    return data;
  }
}

export default new ColumnService(ORM);
