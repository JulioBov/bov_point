import AbstractError from './AbstractError';

class Unauthorized extends AbstractError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

export default Unauthorized;
