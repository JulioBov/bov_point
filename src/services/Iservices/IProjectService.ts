import IProject from '../../interfaces/IProject';
import IRequestQuery from '../../interfaces/IRequestQuery';
import IResult from '../../repositories/interfaces/IResult';

interface IProjectService {
  listProjects: (query: IRequestQuery) => Promise<IResult>;
  createProject: (project?: IProject) => Promise<boolean>;
}

export default IProjectService;
