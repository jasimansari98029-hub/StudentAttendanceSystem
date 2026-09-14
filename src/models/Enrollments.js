import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    currentSemester: { type: Number, required: true },
    batch: { type: String },
  },

  {
    timestamps: true,
  },
);

const model = mongoose.model("Enrollment", enrollmentSchema);

export default model;
