import { Conflict, Unauthorized, NotFound, BadRequest, ServerUnavailable } from '../core/exceptions';
import ORM from '../ORMconnect';

class CardService {
  constructor({ models }) {
    this.Column = models.Column;
    this.Card = models.Card;
  }

  create = async (UserId, {
    ColumnId, position, title, description,
  }) => {
    if (!ColumnId || !position || !title) throw new BadRequest();
    const res = await this.Column.findOne({
      where: {
        UserId,
        id: ColumnId,
      },
    });
    if (!res) throw new NotFound();
    const data = await this.Card.create({
      position,
      title,
      description,
      ColumnId,
      UserId,
    });
    return data;
  }

  remove = async (UserId, ColumnId, id) => {
    if (!ColumnId || !id) throw new BadRequest();
    const res = await this.Column.findOne({
      where: {
        UserId,
        id: ColumnId,
      },
    });
    if (!res) throw new NotFound();
    const data = await this.Card.destroy({
      where: {
        id,
        ColumnId,
      },
    });
    return data;
  }

  update = async (UserId, ExistColumnId, CardId, data) => {
    if (!ExistColumnId || !CardId) throw new BadRequest();
    const card = await this.Card.findOne({
      where: {
        UserId,
        ColumnId: ExistColumnId,
        id: CardId,
      },
    });
    if (!card) throw new NotFound();
    const res = await card.update({ ...data });
    return res;
  }

  replace = async (UserId, { order }) => {
    if (!order) throw new BadRequest();
    order.forEach(async ({ id, position }) => {
      const cardSource = await this.Card.findById(id);
      await cardSource.update({ position });
    });
    const card = await this.Card.findAll({
      where: {
        UserId,
      },
    });
    if (!card) throw new NotFound();
    const res = await card.bulkCreate(
      [
        { position: '2' },
        { position: '0' },
        { position: '1' }],
      {
        updateOnDuplicate: true,
      },
    );
    return res;
  }
}

export default new CardService(ORM);
