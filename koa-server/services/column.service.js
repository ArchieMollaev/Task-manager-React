import Boom from 'boom';
import jwt from 'jsonwebtoken';
import ORMconnect from '../ORMconnect';

const { Column } = ORMconnect;

class ColumnService {
  constructor(repository) {
    this.repository = repository;
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

  createColumn(token, { name }) {
    const UserId = this.decodeToken(token).id;
    if (UserId && name) {
      return this.repository.create({
        name,
        UserId,
      })
        .then(() => ({ success: true }))
        .catch(() => this.response.serverUnavailable());
    }
    return this.response.badRequest();
  }

  removeColumn(token, { id }) {
    const UserId = this.decodeToken(token).id;
    if (id && UserId) {
      return this.repository.destroy({
        where: {
          id,
          UserId,
        },
      })
        .then(result => (
          result ? { success: true } : this.response.notFound('Column')
        ))
        .catch(() => this.response.serverUnavailable());
    }
    return this.response.badRequest();
  }
}

export default new ColumnService(Column);
