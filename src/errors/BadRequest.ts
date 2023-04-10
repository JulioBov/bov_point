import AbstractError from './AbstractError';

class BadRequest extends AbstractError {
  constructor(message = 'Invalid Information') {
    super(400, message);
  }
}

export default BadRequest;
