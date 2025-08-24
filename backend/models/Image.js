import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: String,
  data: Buffer, // Stores the image as binary data
  contentType: String,
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
