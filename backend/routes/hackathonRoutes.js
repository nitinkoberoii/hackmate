import express from "express";
import multer from "multer";

import {
  getHackathons,
  getHackathonById,
  createHackathon,
  updateHackathon,
  deleteHackathon,
  getImage,
} from "../controllers/hackathonController.js";

const router = express.Router();

// --- Configure multer for in-memory storage ---
// This will process a single file upload from a form field named 'image'
// and make it available in req.file within your controller.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- The POST route now uses the multer middleware ---
// It expects multipart/form-data instead of JSON for this route.
router.post("/", upload.single("image"), createHackathon);

router.get("/", getHackathons);
router.get("/:id", getHackathonById);
router.put("/:id", updateHackathon);
router.delete("/:id", deleteHackathon);

// --- Add the route to serve an image by its ID ---
router.get("/image/:id", getImage);

export default router;
