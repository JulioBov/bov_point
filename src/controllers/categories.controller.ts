import { NextFunction, Request, Response } from 'express';
import ICategoriesService from '../services/Iservices/ICategoriesService';
import CategoryService from '../services/cateories.service';
import findTranslation from '../translations/translation';
import errorTranslation from '../utils/error-Translation';
import { joiCreateCategory, joiCreateSubCategory } from '../validations/categories.validation';

class CateroryController {
  private categoryService: ICategoriesService;

  constructor(categoryService: ICategoriesService) {
    this.categoryService = categoryService;
  }

  public createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = joiCreateCategory.validate(req.body);
      await errorTranslation(error, req.user_id);
      await this.categoryService.createCategory(req.user_id, value!);
      const message = await findTranslation(req.user_id, '0');
      return res.status(200).json({ message });
    } catch (error) {
      return next(error);
    }
  };

  public createSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = joiCreateSubCategory.validate(req.body);
      await errorTranslation(error, req.user_id);
      await this.categoryService.createSubCategory(req.user_id, value!);
      const message = await findTranslation(req.user_id, '0');
      return res.status(200).json({ message });
    } catch (error) {
      return next(error);
    }
  };
}

const projectController = new CateroryController(new CategoryService());
export default projectController;
