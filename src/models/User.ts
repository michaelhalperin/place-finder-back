import mongoose, { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  address: string;
  preferences: Record<string, any>;
  favorites: any[];
  settings: Record<string, any>;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  preferences: { type: Map, of: Schema.Types.Mixed, default: {} },
  favorites: [{ type: Schema.Types.Mixed, default: [] }],
  settings: { 
    type: Map, 
    of: Schema.Types.Mixed, 
    default: {} 
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>('User', userSchema);
