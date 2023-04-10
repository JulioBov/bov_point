import express, { Router } from 'express';
import PointController from '../controllers/point.controller';
import verifyPermission from '../middleware/validatePermissions';

const api: Router = express();

api.post('/point', verifyPermission('user:launch_hours'), PointController.createPoint);
api.get('/point', PointController.listPoint);

export default api;
