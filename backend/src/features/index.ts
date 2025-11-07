import { Router } from 'express';
import documentRoutes from './documents/routes';
import dossierRoutes from './dossiers/routes';
import notificationRoutes from './notifications/routes';
import userRoutes from './users/routes';

const featuresRouter = Router();

featuresRouter.use('/users', userRoutes);
featuresRouter.use('/documents', documentRoutes);
featuresRouter.use('/dossiers', dossierRoutes);
featuresRouter.use('/notifications', notificationRoutes);

export default featuresRouter;
