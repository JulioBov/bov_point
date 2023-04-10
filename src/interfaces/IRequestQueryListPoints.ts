import IRequestQuery from './IRequestQuery';

interface IRequestQueryListPoints extends IRequestQuery {
  year: number;
  month: number;
  day: number;
  createdAfter?: string;
  createdBefore?: string;
  category_id?: string;
  sub_category_id?: string;
}

export default IRequestQueryListPoints;
