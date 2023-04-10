import { NextFunction, Request, Response } from 'express';

type VerifyMiddleware = (requiredPermission: string) => (req: Request, res: Response, next: NextFunction) => void;

export const verifyPermission: VerifyMiddleware = (requiredPermission) => (req: Request, res: Response, next: NextFunction) => {
  if (req.permissions.includes(requiredPermission)) next();
  else res.status(403).json({ message: 'User does not have permission to run this feature.' });
};

export default verifyPermission;
