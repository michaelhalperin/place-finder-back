import express from 'express';
import { questionnaireController } from '../controllers/questionnaireController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/questions', questionnaireController.getQuestions);
router.post('/submit/:userId', authMiddleware, questionnaireController.submitAnswers);
router.post('/generate', authMiddleware, questionnaireController.generatePersonalizedQuestions);

export default router;
