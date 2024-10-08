export default class ErrorHandler extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code?: number
  ) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}
