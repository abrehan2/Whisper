import { Response } from 'express';

export default function SendResponse(
  res: Response,
  statusCode: number,
  success: boolean,
  data: object
) {
  res.status(statusCode).json({
    success,
    ...data,
  });
}
