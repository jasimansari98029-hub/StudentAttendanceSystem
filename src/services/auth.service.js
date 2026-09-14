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
    Name: user.name,
    Email: user.email,
    Phone: user.phone,
    Address: user.address,
    Role: user.roles,
    isActive: user.isActive,
    profileImgUrl: user?.profileImgUrl,
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
    Name: createdUser.name,
    Email: createdUser.email,
    Phone: createdUser.phone,
    Address: createdUser.address,
    Role: createdUser.roles,
    isActive: createdUser.isActive,
  };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw { status: 200, message: "If user exists email is sent." };

  const token = crypto.randomUUID();

  // await ResetPassword.create({
  //   userId: user._id,
  //   token,
  // });

  // Note: Password reset link is only sent in the email used to create the resend api

  const resetPasswordLink = `${config.appUrl}/reset-password?userId=${user._id}&token=${token}`;

  sendEmail(email, {
    subject: "Reset password link",
    html: `
        <a
          href="${resetPasswordLink}"
        >
         Click here to Reset password
        </a>`,
  });

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