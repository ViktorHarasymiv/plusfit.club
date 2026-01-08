import { Router } from "express";
import { EmotionCollection } from "../db/models/emotion.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const emotions = await EmotionCollection.find({}, "_id title");
    res.json({
      status: 200,
      message: "Successfully get emotions",
      data: emotions,
    });
  } catch (err) {
    next(err);
  }
});

export default router;

