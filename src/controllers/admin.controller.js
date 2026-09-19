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

const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId, currentSemester, batch } = req.body;

    const enrollment = await adminService.enrollStudent(
      studentId,
      courseId,
      currentSemester,
      batch,
    );
    res.status(201).json({ success: true, data: enrollment });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const assignTeacher = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { teacherId } = req.body;

    const subject = await adminService.assignTeacher(subjectId, teacherId);
    res.json({ success: true, data: subject });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const createSubject = async (req, res) => {
  try {
    const { name, code, courseId, semester, teacherId } = req.body;

    const subject = await adminService.createSubject(
      name,
      code,
      courseId,
      semester,
      teacherId,
    );
    res.status(201).json({ success: true, data: subject });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const { name, code, duration } = req.body;

    const course = await adminService.createCourse(name, code, duration);
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const promoteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { currentSemester } = req.body;

    const enrollment = await adminService.promoteStudent(
      studentId,
      currentSemester,
    );
    res.json({ success: true, data: enrollment });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subject = await adminService.deleteSubject(subjectId);
    res.json({ success: true, message: "Subject deleted", data: subject });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await adminService.listUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export default {
  updateUserRole,
  enrollStudent,
  assignTeacher,
  createSubject,
  createCourse,
  promoteStudent,
  deleteSubject,
  listUsers,
};
