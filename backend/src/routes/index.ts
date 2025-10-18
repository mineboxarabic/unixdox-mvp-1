import { Router } from 'express';
import userRoutes from './user.routes';
import documentRoutes from './document.routes';
import dossierRoutes from './dossier.routes';
import notificationRoutes from './notification.routes';

const router = Router();

// API Routes
router.use('/users', userRoutes);
router.use('/documents', documentRoutes);
router.use('/dossiers', dossierRoutes);
router.use('/notifications', notificationRoutes);

export default router;
