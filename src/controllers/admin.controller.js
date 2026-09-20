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

const listCourses = async (req, res) => {
  try {
    const courses = await adminService.listCourses();
    res.json({ success: true, data: courses });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const listTeachers = async (req, res) => {
  try {
    const teachers = await adminService.listTeachers();
    res.json({ success: true, data: teachers });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const listSubjects = async (req, res) => {
  try {
    const subjects = await adminService.listSubjects();
    res.json({ success: true, data: subjects });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const listEnrollments = async (req, res) => {
  try {
    const enrollments = await adminService.listEnrollments();
    res.json({ success: true, data: enrollments });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, code, duration } = req.body;

    const course = await adminService.updateCourse(
      courseId,
      name,
      code,
      duration,
    );
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await adminService.deleteCourse(courseId);
    res.json({ success: true, message: "Course deleted", data: course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await adminService.deleteUser(userId);
    res.json({ success: true, message: "User deleted", data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { name, code, courseId, semester, teacherId } = req.body;

    const subject = await adminService.updateSubject(
      subjectId,
      name,
      code,
      courseId,
      semester,
      teacherId,
    );
    res.json({ success: true, data: subject });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const listSubjectById = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subject = await adminService.listSubjectById(subjectId);
    res.json({ success: true, data: subject });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const listCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await adminService.listCourseById(courseId);
    res.json({ success: true, data: course });
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
  listCourses,
  listTeachers,
  listSubjects,
  listEnrollments,
  updateCourse,
  deleteCourse,
  deleteUser,
  updateSubject,
  listSubjectById,
  listCourseById,
};
