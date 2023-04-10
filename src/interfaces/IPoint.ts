import ICategory from './ICategory';
import ISubCategory from './ISubCategory';

interface IPoint {
  point_id: string;
  user_id: string;
  time: string;
  date: Date;
  day: number;
  month: number;
  year: number;
  category_id: string;
  sub_category_id: string;
  category?: ICategory;
  subCategory?: ISubCategory;
  status: string;
}

export default IPoint;
