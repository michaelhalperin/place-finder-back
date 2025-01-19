import { Request, Response } from "express";
import { User } from "../models/User";

export const userController = {
  async updateSettings(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const newSettings = req.body;

      if (!newSettings || typeof newSettings !== "object") {
        return res.status(400).json({ message: "Invalid settings format" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const settingsMap = new Map(Object.entries(newSettings));

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { settings: settingsMap } },
        { new: true, runValidators: true }
      );

      res.json({
        settings: Object.fromEntries(updatedUser?.settings.entries()),
        message: "Settings updated successfully",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      res.status(500).json({
        message: "Server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};
