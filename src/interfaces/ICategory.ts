import IProject from './IProject';

interface ICategory {
  category_id?: string;
  project_id?: string;
  project?: IProject;
  name: string;
  status: string;
  createdAt?: Date;
  updateAt?: Date;
}

export default ICategory;
