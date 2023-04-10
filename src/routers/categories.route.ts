import express, { Router } from 'express';
import CategoryController from '../controllers/categories.controller';
import verifyPermission from '../middleware/validatePermissions';

const api: Router = express();

api.post('/categories', verifyPermission('catory:register'), CategoryController.createCategory);
api.post('/categories/sub', verifyPermission('catory:register'), CategoryController.createSubCategory);

export default api;
