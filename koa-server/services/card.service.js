import Boom from 'boom';
import jwt from 'jsonwebtoken';
import ORMconnect from '../ORMconnect';

class CardService {
  constructor(repository) {
    this.repository = repository;
    this.Column = repository.Column;
    this.Card = repository.Card;
    this.response = {
      badRequest() {
        return Boom.badRequest('invalid query').output.payload;
      },
      serverUnavailable() {
        return Boom.serverUnavailable('failed to write to database').output.payload;
      },
      notFound(message) {
        return Boom.notFound(`${message || 'source'} does not exist`).output.payload;
      },
    };
    this.decodeToken = token => (
      jwt.verify(
        token.split(' ')[1], 'secret_word',
        (err, decoded) => (err ? null : decoded),
      )
    );
  }

  createCard(token, {
    ColumnId,
    position,
    title,
    description,
  }) {
    const UserId = this.decodeToken(token).id;
    if (ColumnId && position && title) {
      return this.Column.findOne({
        where: {
          UserId,
          id: ColumnId,
        },
      })
        .then((result) => {
          if (result) {
            return this.Card.create({
              position,
              title,
              description,
              ColumnId,
              UserId,
            })
              .then(() => ({ success: true }))
              .catch(() => this.response.serverUnavailable());
          }
          return this.response.notFound('column');
        });
    }
    return this.response.badRequest();
  }


  removeCard(token, { ColumnId, id }) {
    const UserId = this.decodeToken(token).id;
    if (ColumnId && id) {
      return this.Column.findOne({
        where: {
          UserId,
          id: ColumnId,
        },
      })
        .then((result) => {
          if (result) {
            return this.Card.destroy({
              where: {
                id,
                ColumnId,
              },
            })
              .then(response => (
                response ? { success: true } : this.response.notFound('Card')
              ))
              .catch(() => this.response.serverUnavailable());
          }
          return this.response.notFound('Column');
        });
    }
    return this.response.badRequest();
  }
}

export default new CardService(ORMconnect);
