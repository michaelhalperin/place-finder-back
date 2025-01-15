import express from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.put('/settings/:userId', authMiddleware, userController.updateSettings);

export default router;
