import { Request, Response } from 'express';
import { User } from '../models/User';

export const userController = {
  async updateSettings(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const settings = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        { settings },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user.settings);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};
