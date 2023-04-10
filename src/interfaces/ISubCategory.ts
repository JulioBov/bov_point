import ICategory from './ICategory';

interface ISubCategory {
  sub_category_id?: string;
  category_id: string;
  category?: ICategory;
  name: string;
  status: string;
  createdAt?: Date;
  updateAt?: Date;
}

export default ISubCategory;
