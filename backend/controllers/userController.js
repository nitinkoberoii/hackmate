import User from "../models/User.js";
import Image from "../models/Image.js";
import Hackathon from "../models/Hackathon.js";

// Create user
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate(
      "created_events saved_events photo_url"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "created_events saved_events photo_url"
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload profile picture
export const uploadUserImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded");

    const newImage = new Image({
      name: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    const savedImage = await newImage.save();

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { photo_url: savedImage._id },
      { new: true }
    );

    res.json({ message: "Image uploaded", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Save event to user
export const saveEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { saved_events: eventId } },
      { new: true }
    ).populate("saved_events");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add created event to user
export const addCreatedEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { created_events: eventId } },
      { new: true }
    ).populate("created_events");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
