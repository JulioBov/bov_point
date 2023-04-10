import ICategory from '../../interfaces/ICategory';
import ISubCategory from '../../interfaces/ISubCategory';

interface ICategoriesService {
  createCategory: (userId: string, category: ICategory) => Promise<boolean>;
  createSubCategory: (userId: string, category: ISubCategory) => Promise<boolean>;
}

export default ICategoriesService;
