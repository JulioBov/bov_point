import IResultCategories from './IResultCategories';

interface IResultListProject {
  project_id: string;
  project_name: string;
  project_status: string;
  categories: IResultCategories[];
}

export default IResultListProject;
