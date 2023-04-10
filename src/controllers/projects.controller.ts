import { NextFunction, Request, Response } from 'express';
import IRequestQuery from '../interfaces/IRequestQuery';
import IProjectService from '../services/Iservices/IProjectService';
import ProjectService from '../services/projects.service';
import findTranslation from '../translations/translation';
import errorTranslation from '../utils/error-Translation';
import { joiCreateProject } from '../validations/projects.validation';

class ProjectController {
  private projectService: IProjectService;

  constructor(projectService: IProjectService) {
    this.projectService = projectService;
  }

  public createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = joiCreateProject.validate(req.body);
      await errorTranslation(error, req.user_id);
      await this.projectService.createProject(value);
      const message = await findTranslation(req.user_id, '0');
      return res.status(200).json({ message });
    } catch (error) {
      return next(error);
    }
  };

  public listProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: IRequestQuery = {
        pageSize: Number(req.query.pageSize),
        page: Number(req.query.page),
        id: req.query.id as string | undefined,
      };
      const result = await this.projectService.listProjects(query);
      return res.status(200).json({ data: result, message: await findTranslation(req.user_id, '4') });
    } catch (error) {
      return next(error);
    }
  };
}

const projectController = new ProjectController(new ProjectService());
export default projectController;
