import mongoose from "mongoose";

// Course
const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    duration: { type: Number },
  },
  {
    timestamps: true,
  },
);

const model = mongoose.model("Course", courseSchema);

export default model;
