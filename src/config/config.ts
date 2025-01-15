import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  mongoUri: string;
  jwtSecret: string;
  googlePlacesApiKey: string;
  env: string;
}

export const config: Config = {
  port: Number(process.env.PORT) || 3000,
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://michael:michael2135@cluster0.rubaqqj.mongodb.net/mobile-app",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY || "",
  env: process.env.NODE_ENV || "development",
};
