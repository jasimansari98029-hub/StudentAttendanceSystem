import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, required: true },
  records: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      status: {
        type: String,
        enum: ["PRESENT", "ABSENT", "LATE"],
        required: true,
      },
    },
  ],
});
attendanceSchema.index({ subject: 1, date: 1 }, { unique: true });

const model = mongoose.model("Attendance", attendanceSchema);

export default model;