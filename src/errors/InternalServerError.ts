import AbstractError from './AbstractError';

class InternalServerError extends AbstractError {
  constructor(message = 'Internal error') {
    super(500, message);
  }
}

export default InternalServerError;
