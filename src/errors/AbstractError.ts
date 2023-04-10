export default abstract class AbstractError extends Error {
  statusCode: number;
  errorCode: number;

  constructor(statusCode: number, message: string) {
    if (new.target === AbstractError) {
      throw new TypeError('The abstract class "AbstractError" cannot be directly instantiated.');
    }

    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
