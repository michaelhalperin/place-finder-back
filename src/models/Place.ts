import mongoose, { Schema } from 'mongoose';
import { Activity } from '../types';

const placeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  rating: { type: Number, default: 0 },
  image: { type: String, required: true },
  openingHours: { type: String },
  features: [{ type: String }],
  tags: [{ type: String }],
  difficulty: { type: String },
  duration: { type: String },
  timeOfDay: { type: String },
  phone: { type: String },
  website: { type: String },
});

export const Place = mongoose.model<Activity & Document>('Place', placeSchema);
