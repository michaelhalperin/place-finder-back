import { Request, Response } from 'express';
import { QuestionModel } from '../models/Question';
import { User } from '../models/User';
import { Question, UserSettings } from '../types';
import { formatResponse } from '../utils/responseFormatter';

export const questionnaireController = {
  async getQuestions(req: Request, res: Response) {
    try {
      const questions = await QuestionModel.find();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching questions' });
    }
  },

  async submitAnswers(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const userAnswers: UserSettings = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        { settings: userAnswers },
        { new: true }
      ).lean();

      if (!user) {
        return res.status(404).json(formatResponse(undefined, 'User not found'));
      }

      res.json(formatResponse({ settings: user.settings }));
    } catch (error) {
      res.status(500).json(formatResponse(undefined, 'Error saving answers'));
    }
  },

  async generatePersonalizedQuestions(req: Request, res: Response) {
    try {
      const { previousAnswers } = req.body;
      
      // Logic to generate next questions based on previous answers
      // This could involve complex logic or AI/ML models
      const nextQuestions: Question[] = await QuestionModel.find({
        'options.id': { $in: Object.values(previousAnswers) }
      });

      res.json({ questions: nextQuestions });
    } catch (error) {
      res.status(500).json({ message: 'Error generating questions' });
    }
  }
};
