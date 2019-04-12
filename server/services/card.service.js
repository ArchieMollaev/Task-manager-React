import { NotFound, BadRequest } from '../core/exceptions';
import ORM from '../ORMconnect';

class CardService {
  constructor({ models }) {
    this.Column = models.Column;
    this.Card = models.Card;
  }

  create = async (UserId, { columnId, position, title, description }) => {
    if (!columnId || !position || !title) throw new BadRequest();
    const res = await this.Column.findOne({
      where: {
        UserId,
        id: columnId,
      },
    });
    if (!res) throw new NotFound();
    const data = await this.Card.create({
      title,
      description,
      ColumnId: columnId,
      UserId,
      position,
    });
    return data;
  };

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
  };

  update = async (UserId, cardData) => {
    if (!cardData || !UserId) throw new BadRequest();
    const card = await this.Card.findOne({
      where: {
        UserId,
        id: cardData.id,
      },
    });
    if (!card) throw new NotFound();
    console.log('----sdsd----=====', cardData);
    const res = await card.update(cardData);
    return res;
  };

  replace = async (UserId, { order }) => {
    if (!order) throw new BadRequest();
    const cards = await this.Card.findAll({
      where: {
        UserId,
      },
    });
    if (!cards) throw new NotFound();
    await Promise.all(
      cards.map(async item => {
        const { position } = order.find(data => data.id === item.id);
        await item.update({ position });
      }),
    );
    return { success: true };
  };
}

export default new CardService(ORM);
