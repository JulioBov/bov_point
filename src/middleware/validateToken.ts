import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import environments from '../enviroments';
import Unauthorized from '../errors/Unauthorized';

declare global {
  namespace Express {
    interface Request {
      user_id: string;
      permissions: string[];
    }
  }
}

interface TokenPayload extends JwtPayload {
  user_id: string;
  onlyPermissions: string[];
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decode = jwt.verify(token!, environments.KEY_TOKEN!) as TokenPayload;
    req.user_id = decode.user_id;
    req.permissions = decode.onlyPermissions;
    next();
  } catch (err) {
    throw new Unauthorized();
  }
};

export default validateToken;
