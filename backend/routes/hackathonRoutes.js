import express from "express";
import {
  getHackathons,
  getHackathonById,
  createHackathon,
  updateHackathon,
  deleteHackathon,
} from "../controllers/hackathonController.js";

const router = express.Router();

router.get("/", getHackathons);
router.get("/:id", getHackathonById);
router.post("/", createHackathon);
router.put("/:id", updateHackathon);
router.delete("/:id", deleteHackathon);

export default router;
