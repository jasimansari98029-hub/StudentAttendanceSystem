import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is not optional..."],
  },
  email: {
    type: String,
    required: [true, "Email is Required..."],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(value);
      },
      message: "invalid Email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is Required..."],
    minlength: [6, "Password length must be atleast 6"],
  },
  phone: {
    type: String,
    required: [true, "Phone no is Required..."],
    minlength: [6, "Plz enter a valid number"],
    maxlength: [13, "Plz enter a valid number"],
  },
  address: {
    city: { type: String, required: [true, "plz enter city"] },
    province: { type: String, required: [true, "plz enter province"] },
    country: { type: String, default: "Nepal" },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  roles: {
    type: [String],
    default: ["USER"],
    enum: ["USER", "TEACHER","ADMIN"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const model = mongoose.model("User", userSchema);

export default model;