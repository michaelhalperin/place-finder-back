import { Request, Response } from "express";
import { User } from "../models/User";

export const userController = {
  async updateSettings(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { action } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let update;
      if (action === "addPlace") {
        const { place } = req.body;
        if (!place || typeof place !== "object") {
          return res.status(400).json({ message: "Invalid place format" });
        }
        update = {
          $push: { "settings.savedPlaces": place },
        };
      } else if (action === "updateProfile") {
        const { name, email, image } = req.body;
        update = {
          $set: {
            name,
            email,
            image,
          },
        };
      } else if (action === "updatePreferences") {
        const { preferences } = req.body;
        update = {
          $set: {
            preferences,
          },
        };
      } else {
        return res.status(400).json({ message: "Invalid action specified" });
      }

      const updatedUser = await User.findByIdAndUpdate(userId, update, {
        new: true,
        runValidators: true,
      });

      res.json({
        settings: updatedUser?.settings,
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

  async deleteSavedPlace(req: Request, res: Response) {
    try {
      const { userId, placeId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const update = {
        $pull: {
          "settings.savedPlaces": { _id: placeId },
        },
      };

      const updatedUser = await User.findByIdAndUpdate(userId, update, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        settings: updatedUser.settings,
        message: "Place deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting saved place:", error);
      res.status(500).json({
        message: "Server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};
