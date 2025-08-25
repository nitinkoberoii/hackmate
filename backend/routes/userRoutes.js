import express from "express";
import multer from "multer";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserImage,
  saveEvent,
  addCreatedEvent,
} from "../controllers/userController.js";

const router = express.Router();
const upload = multer(); // middleware for image uploads

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Image upload
router.post("/:id/upload-image", upload.single("image"), uploadUserImage);

// Hackathon events
router.post("/:id/save-event", saveEvent);
router.post("/:id/create-event", addCreatedEvent);

export default router;
