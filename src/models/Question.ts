import mongoose, { Schema } from 'mongoose';
import { Question } from '../types';

const questionSchema = new Schema({
  id: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  options: [{
    id: { type: String, required: true },
    label: { type: String, required: true },
    icon: { type: String },
  }],
});

export const QuestionModel = mongoose.model<Question & Document>('Question', questionSchema);
