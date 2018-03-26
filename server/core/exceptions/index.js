import { conflict, unauthorized, notFound, badRequest, serverUnavailable } from 'boom';

export class Conflict extends Error {
  constructor(message) {
    super(message);
    this.payload = conflict(message || 'source already exist').output.payload;
  }
}

export class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.payload = unauthorized(message || 'invalid credentials').output.payload;
  }
}

export class NotFound extends Error {
  constructor(message) {
    super(message);
    this.payload = notFound(message || 'source not found').output.payload;
  }
}

export class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.payload = badRequest(message || 'invalid query').output.payload;
  }
}

export class ServerUnavailable extends Error {
  constructor(message) {
    super(message);
    this.payload = serverUnavailable(message || 'database connection failed').output.payload;
  }
}

// class Http {
//   get signFailed() {
//     return conflict('user with email already exist').output.payload;
//   }
//   get authFailed() {
//     return unauthorized('invalid credentials').output.payload;
//   }

//   get notFound() {
//     return notFound('source does not exist').output.payload;
//   }

//   get badRequest() {
//     return badRequest('invalid query').output.payload;
//   }

//   get unavailable() {
//     return serverUnavailable('database connection failed').output.payload;
//   }
// }

// export default new Http();
