import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  random,
  sub,
  trend,
  updateVideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/", verifyToken, deleteVideo);
router.get("/:id", getVideo);
router.put("/view/:id", addView);
router.put("/trend", trend);
router.put("/random", random);
router.put("/sub", verifyToken, sub);

export default router;
