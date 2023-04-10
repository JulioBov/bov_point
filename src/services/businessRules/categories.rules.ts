import NotFound from '../../errors/NotFound';
import ICategory from '../../interfaces/ICategory';
import ISubCategory from '../../interfaces/ISubCategory';
import CategoriesRepository from '../../repositories/categories.repository';
import ProjectsRepository from '../../repositories/projects.repository';
import findTranslation from '../../translations/translation';

export const validateCreateCategory = async (userId: string, category: ICategory): Promise<boolean> => {
  if (category.project_id && !(await ProjectsRepository.findProject(category.project_id))) {
    throw new NotFound(await findTranslation(userId, '6'));
  }
  return true;
};

export const validateCreateSubCategory = async (userId: string, subCategory: ISubCategory): Promise<boolean> => {
  if (!(await CategoriesRepository.findCategory(subCategory.category_id))) {
    throw new NotFound(await findTranslation(userId, '7'));
  }
  return true;
};

export default {
  validateCreateCategory,
  validateCreateSubCategory,
};
