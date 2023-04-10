import AbstractError from './AbstractError';

class NotFound extends AbstractError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

export default NotFound;
