import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import IErrorCustom from './interfaces/IErrorCustom';
import logger from './logger';

function handlerError(statusCode: number, message: string, err: IErrorCustom, req: Request, res: Response, next: NextFunction) {
  const code = uuidv4();
  const logError = objectLogError(req, err, code);
  logger.error(`Error ${logError}`);
  if (statusCode === 403) {
    return res.status(statusCode).json({ message });
  }
  if (statusCode === 500 || statusCode === undefined) {
    return res.status(500).json({ message });
  }
  if (statusCode !== 500) {
    return res.status(statusCode).json({ message, code });
  }
  return next(err);
}

function objectLogError(req: Request, err: Error, code: string) {
  delete req.body?.password;
  const error = `Code: ${code} || Path: ${req.route !== undefined ? req.route.path : 'Invalid Route'}
  || Method: ${req.method}
  || Body: ${req.body !== undefined ? JSON.stringify(req.body) : 'Not Body'}
  || Host: ${req.headers !== undefined ? req.headers.host : 'Not headers'}
  || Params: ${req.params !== undefined ? JSON.stringify(req.params) : 'Not Params'}
  || Original URL: ${req.originalUrl !== undefined ? req.originalUrl : 'Not Original Url'}
  || Ip: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}
  || Stack: ${err.stack !== undefined ? err.stack : 'Not stack'}`;
  return error;
}

export default handlerError;
