import express from "express";
import {
  deleteUser,
  dislike,
  getUser,
  like,
  subscribe,
  unsubscribe,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.put("/sub/:channelId", subscribe);
router.put("/unsub/:channelId", unsubscribe);
router.put("/like/:videoId", like);
router.put("/dislike/:videoId", dislike);

export default router;
