import { v4 as uuidv4 } from 'uuid';
import IProject from '../interfaces/IProject';
import IRequestQuery from '../interfaces/IRequestQuery';
import IResult from '../repositories/interfaces/IResult';
import ProjectRepository from '../repositories/projects.repository';
import IProjectService from '../services/Iservices/IProjectService';

class ProjectService implements IProjectService {
  async listProjects(query: IRequestQuery): Promise<IResult> {
    return await ProjectRepository.listProjects(query.pageSize, query.page, query.id);
  }

  async createProject(project?: IProject) {
    const projectDb: IProject = {
      project_id: uuidv4(),
      name: project?.name,
      status: 'active',
    };
    await ProjectRepository.createProject(projectDb);
    return true;
  }
}

export default ProjectService;
