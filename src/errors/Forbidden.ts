import AbstractError from './AbstractError';

class Forbidden extends AbstractError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

export default Forbidden;
