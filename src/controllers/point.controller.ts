import { NextFunction, Request, Response } from 'express';
import IRequestQueryListPoints from '../interfaces/IRequestQueryListPoints';
import IPointService from '../services/Iservices/IPointService';
import PointService from '../services/point.service';
import findTranslation from '../translations/translation';
import errorTranslation from '../utils/error-Translation';
import { joiCreatePoint } from '../validations/point.validation';

class PointController {
  private pointService: IPointService;

  constructor(pointService: IPointService) {
    this.pointService = pointService;
  }

  public createPoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = joiCreatePoint.validate(req.body);
      await errorTranslation(error, req.user_id);
      await this.pointService.createPoint(value!, req.user_id);
      const message = await findTranslation(req.user_id, '0');
      return res.status(200).json({ message });
    } catch (error) {
      return next(error);
    }
  };

  public listPoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: IRequestQueryListPoints = {
        pageSize: Number(req.query.pageSize),
        page: Number(req.query.page),
        id: req.query.id as string | undefined,
        year: Number(req.query.year),
        month: Number(req.query.month),
        day: Number(req.query.day),
        createdAfter: req.query.createdAfter?.toString(),
        createdBefore: req.query.createdBefore?.toString(),
        sub_category_id: req.query.sub_category_id?.toString(),
        category_id: req.query.category_id?.toString(),
      };

      const result = await this.pointService.listPoints(query, req.user_id);
      const message = await findTranslation(req.user_id, '18');
      return res.status(200).json({ message, data: result });
    } catch (error) {
      return next(error);
    }
  };
}

const projectController = new PointController(new PointService());
export default projectController;
