import AbstractError from './AbstractError';

class UnprocessableEntity extends AbstractError {
  constructor(message = 'Unable to process instructions.') {
    super(422, message);
  }
}

export default UnprocessableEntity;
