import Hackathon from "../models/Hackathon.js";
import Image from "../models/Image.js";

// @desc Get all hackathons
export const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hackathons", error });
  }
};

// --- Controller to get an image by its ID ---
export const getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image || !image.data) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.set("Content-Type", image.contentType);
    res.send(image.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching image", error });
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
    const hackathonData = req.body;
    let imageId = null;

    if (req.file) {
      const newImage = new Image({
        name: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype,
      });
      const savedImage = await newImage.save();
      imageId = savedImage._id;
    }

    // --- Parse `teamSize` and `requiredSkills` from FormData ---
    if (hackathonData.teamSize) {
      hackathonData.teamSize = JSON.parse(hackathonData.teamSize);
    }
    if (hackathonData.requiredSkills) {
      // The array is sent as a JSON string, so we need to parse it back.
      hackathonData.requiredSkills = JSON.parse(hackathonData.requiredSkills);
    }

    const newHackathon = new Hackathon({
      ...hackathonData,
      image: imageId,
    });

    await newHackathon.save();
    res.status(201).json(newHackathon);
  } catch (error) {
    console.error("Creation Error:", error);
    res
      .status(400)
      .json({ message: "Error creating hackathon", error: error.message });
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
