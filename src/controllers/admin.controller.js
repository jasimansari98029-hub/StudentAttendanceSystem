import adminService from "../services/admin.service.js";

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { roles } = req.body;

    const user = await adminService.updateUserRole(userId, roles);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export default { updateUserRole };
