import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import enviroments from './enviroments';
import NotFound from './errors/NotFound';
import handlerError from './handlerError';
import IErrorCustom from './interfaces/IErrorCustom';
import routes from './routes';

const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFound());
});

app.use((err: IErrorCustom, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;
  return handlerError(statusCode, message, err, req, res, next);
});

app.listen(enviroments.PORT, () => {
  console.log(`Server running on port: ${enviroments.PORT}`);
});

export default app;
