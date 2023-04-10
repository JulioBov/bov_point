import { v4 as uuidv4 } from 'uuid';
import ICategory from '../interfaces/ICategory';
import ISubCategory from '../interfaces/ISubCategory';
import CategoriesRepository from '../repositories/categories.repository';
import SubCategoriesRepository from '../repositories/sub_categories.repository';
import ICategoriesService from '../services/Iservices/ICategoriesService';
import CategoriesRules from './businessRules/categories.rules';

class CategoryService implements ICategoriesService {
  async createSubCategory(userId: string, subCategory: ISubCategory) {
    await CategoriesRules.validateCreateSubCategory(userId, subCategory);
    const subCategoryDb: ISubCategory = {
      sub_category_id: uuidv4(),
      category_id: subCategory.category_id,
      name: subCategory.name,
      status: 'active',
    };
    await SubCategoriesRepository.createSubCategory(subCategoryDb);
    return true;
  }
  async createCategory(userId: string, category: ICategory) {
    await CategoriesRules.validateCreateCategory(userId, category);
    const categoryDb: ICategory = {
      category_id: uuidv4(),
      project_id: category.project_id,
      name: category.name,
      status: 'active',
    };
    await CategoriesRepository.createCategory(categoryDb);
    return true;
  }
}

export default CategoryService;
