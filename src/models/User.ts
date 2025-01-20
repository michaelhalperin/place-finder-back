import { Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  address: string;
  image: string;
  preferences: Record<string, any>;
  favorites: any[];
  friends: any[];
  settings: Record<string, any>;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// ... existing code ...

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String },
  image: { type: String, default: '' },
  preferences: { type: Map, of: Schema.Types.Mixed, default: {} },
  settings: {
    type: {
      savedPlaces: [
        {
          latitude: Number,
          longitude: Number,
          title: String,
        },
      ],
      friends: [Schema.Types.Mixed],
    },
    default: {
      savedPlaces: [],
      friends: [],
    },
  },
});

// ... existing code ...


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>("User", userSchema);
