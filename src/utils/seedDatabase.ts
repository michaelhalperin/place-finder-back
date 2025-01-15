import { QuestionModel } from '../models/Question';
import { Question } from '../types';

const initialQuestions: Question[] = [
  {
    id: 'q1',
    question: 'What type of activities do you prefer?',
    options: [
      { id: 'outdoor', label: 'Outdoor Activities', icon: '🌳' },
      { id: 'indoor', label: 'Indoor Activities', icon: '🏠' },
      { id: 'both', label: 'Both', icon: '🔄' }
    ]
  },
  // Add more initial questions as needed
];

export const seedQuestions = async () => {
  try {
    await QuestionModel.deleteMany({});
    await QuestionModel.insertMany(initialQuestions);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}; 