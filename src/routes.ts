import express, { Router } from 'express';
import validateToken from './middleware/validateToken';
import categoriesRoutes from './routers/categories.route';
import pointRoutes from './routers/point.route';
import projectsRoutes from './routers/projects.route';

const api: Router = express();

api.use('/v1', validateToken, projectsRoutes);
api.use('/v1', validateToken, categoriesRoutes);
api.use('/v1', validateToken, pointRoutes);

api.get('/health', async (req, res) => {
  try {
    res.status(200).send({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: 'Not OK' });
  }
});

export default api;
