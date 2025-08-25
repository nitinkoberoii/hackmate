import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String }, // only for email/pass login
    photo_url: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
      default: "68ab9ebfbc15be80590c4a6d", // <— your default image ID
    },
    tech_interests: [String],
    timezone: String,
    skill_scores: {
      type: Object,
      default: {},
    },
    saved_events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" }],
    created_events: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
