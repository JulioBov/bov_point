import express, { Router } from 'express';
import ProjectController from '../controllers/projects.controller';
import verifyPermission from '../middleware/validatePermissions';

const api: Router = express();

api.get('/projects', verifyPermission('project:register'), ProjectController.listProjects);
api.post('/projects', verifyPermission('project:register'), ProjectController.createProject);

export default api;
