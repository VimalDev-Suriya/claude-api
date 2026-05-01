import express from 'express';
import chatRoutes from './chatRoute';

const routes = express.Router();

routes.use('/chat', chatRoutes);

export default routes;
