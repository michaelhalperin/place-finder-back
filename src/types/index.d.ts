import { UserDocument } from './index';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: UserDocument;
    }
  }
} 