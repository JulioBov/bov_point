import IResultSubCategories from './IResultSubCategories';

interface IResultCategories {
  category_id: string;
  category_name: string;
  category_status: string;
  sub_categories: IResultSubCategories[];
}

export default IResultCategories;
