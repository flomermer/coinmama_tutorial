class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest)
      return 400;
    if (this instanceof NotFound)
      return 404;

    return 500;
  }
}

class BadRequest extends GeneralError {
  constructor(message='400 - bad request'){
    super(message);
    this.name = 'BadRequest';
  }
}
class NotFound extends GeneralError {  
  constructor(message='404 - page not found'){
    super(message);
    this.name = 'NotFound';
  }
}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound
};
