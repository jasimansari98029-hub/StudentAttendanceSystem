import bcrypt from "bcryptjs";
import User from "../models/Users.js";
import ResetPassword from "../models/ResetPassword.js";
import config from "../config/config.js";

const login = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });
  if (!user)
    throw {
      status: 404,
      message: "user not found",
    };
  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);
  if (!isPasswordMatch)
    throw {
      status: 400,
      message: "incorrect email or password",
    };

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    roles: user.roles,
    isActive: user.isActive,
  };
};

const register = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });
  if (user)
    throw {
      status: 409,
      message: "user already exists",
    };
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(data.password, salt);
  const createdUser = await User.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    password: hashedPassword,
  });

  return {
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    phone: createdUser.phone,
    address: createdUser.address,
    roles: createdUser.roles,
    isActive: createdUser.isActive,
  };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw { status: 200, message: "If user exists email is sent." };

  const token = crypto.randomUUID();

  await ResetPassword.create({
    userId: user._id,
    token,
  });

  const resetPasswordLink = `${config.appUrl}/reset-password?userId=${user._id}&token=${token}`;

  console.log(resetPasswordLink);

  return { message: "Reset password link sent successfully." };
};

const resetPassword = async (userId, token, password) => {
  const data = await ResetPassword.findOne({
    userId,
    expiresAt: { $gt: Date.now() },
  }).sort({ createdAt: -1 });

  if (!data || data.token != token) {
    throw { status: 400, message: "Invalid or expired token." };
  }

  if (data.isUsed) {
    throw { status: 400, message: "Link already expired or Used." };
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
  });

  await ResetPassword.findByIdAndUpdate(data._id, {
    isUsed: true,
  });

  return { message: "Password reset successful." };
};

export default { login, register, forgotPassword, resetPassword };
