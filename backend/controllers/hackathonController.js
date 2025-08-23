// backend/controllers/hackathonController.js
import Hackathon from "../models/Hackathon.js";

// @desc Get all hackathons
export const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hackathons", error });
  }
};

// @desc Get hackathon by ID
export const getHackathonById = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon)
      return res.status(404).json({ message: "Hackathon not found" });
    res.json(hackathon);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hackathon", error });
  }
};

// @desc Create new hackathon
export const createHackathon = async (req, res) => {
  try {
    const newHackathon = new Hackathon(req.body);
    await newHackathon.save();
    res.status(201).json(newHackathon);
  } catch (error) {
    res.status(400).json({ message: "Error creating hackathon", error });
  }
};

// @desc Update hackathon
export const updateHackathon = async (req, res) => {
  try {
    const updatedHackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedHackathon)
      return res.status(404).json({ message: "Hackathon not found" });
    res.json(updatedHackathon);
  } catch (error) {
    res.status(400).json({ message: "Error updating hackathon", error });
  }
};

// @desc Delete hackathon
export const deleteHackathon = async (req, res) => {
  try {
    const deleted = await Hackathon.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Hackathon not found" });
    res.json({ message: "Hackathon deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hackathon", error });
  }
};
