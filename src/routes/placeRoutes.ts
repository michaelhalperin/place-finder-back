import express from 'express';
import { placeController } from '../controllers/placeController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/nearby', authMiddleware, placeController.getNearbyPlaces);
router.get('/details/:placeId', authMiddleware, placeController.getPlaceDetails);
router.get('/recommended', authMiddleware, placeController.getRecommendedPlaces);

export default router;
