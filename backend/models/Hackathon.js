import mongoose from "mongoose";

const teamSizeSchema = new mongoose.Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
});

const hackathonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    organizer: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // optional (default placeholder can be set)
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: { type: String }, // "48 hours"
    theme: { type: String },
    prizePool: { type: String }, // "$25,000"
    teamSize: { type: teamSizeSchema, required: true },
    location: {
      type: String,
      enum: ["Virtual", "Onsite", "Hybrid"],
      default: "Virtual",
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Upcoming"],
      default: "Open",
    },
    registrations: { type: Number, default: 0 },
    maxParticipants: { type: Number, required: true },
    requiredSkills: [{ type: String }],
    compatibilityScore: { type: Number, min: 0, max: 100 }, // dynamic, not always stored
    isBookmarked: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Hackathon = mongoose.model("Hackathon", hackathonSchema);

export default Hackathon;
