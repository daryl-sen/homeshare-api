export class AuthorizationError extends Error {
  status = 403;

  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class AuthenticationError extends Error {
  status = 401;

  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class NotFoundError extends Error {
  status = 404;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
