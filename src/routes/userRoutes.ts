import express from "express";
import { userController } from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";
import { User } from "../models/User";

const router = express.Router();

router.put("/settings/:userId", authMiddleware, userController.updateSettings);

router.delete(
  "/settings/:userId/:placeId",
  authMiddleware,
  userController.deleteSavedPlace
);

router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("-password")
      .lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user);
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      image: user.image,
      address: user.address,
      preferences: user.preferences || {},
      savedPlaces: user.settings?.savedPlaces || [],
      friends: user.settings?.friends || [],
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

export default router;
