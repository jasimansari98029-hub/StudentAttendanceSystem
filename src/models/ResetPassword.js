import mongoose from "mongoose";

const resetPasswordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User Id is required."],
  },
  token: {
    type: String,
    required: [true, "Reset password token is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    default: Date.now() + 3600000,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

const model = mongoose.model("ResetPassword", resetPasswordSchema);

export default model;