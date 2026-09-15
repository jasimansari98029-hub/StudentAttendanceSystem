import User from "../models/Users.js";

const VALID_ROLES = ["USER", "TEACHER"];

const updateUserRole = async (userId, roles) => {
  if (!Array.isArray(roles) || roles.length === 0) {
    throw new Error("roles must be a non-empty array");
  }

  const invalid = roles.filter((r) => !VALID_ROLES.includes(r));
  if (invalid.length > 0) {
    throw new Error(`Invalid role(s): ${invalid.join(", ")}`);
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { roles } },
    { new: true, runValidators: true },
  );

  if (!user) throw new Error("User not found");
  return { message: "User role updated successfully", success: true };
};

export default {
  updateUserRole,
};
