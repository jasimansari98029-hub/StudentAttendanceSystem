import User from "../models/Users.js";
import Enrollment from "../models/Enrollments.js";
import Course from "../models/Courses.js";
import Subject from "../models/Subjects.js";
import Attendance from "../models/Attendances.js";

const updateUserRole = async (userId, roles) => {
  const user = await User.findByIdAndUpdate(userId, { roles }, { new: true });

  if (!user) throw new Error("User not found");
  return { message: "User role updated successfully", success: true };
};

const enrollStudent = async (studentId, courseId, currentSemester, batch) => {
  const student = await User.findById(studentId);
  if (!student) throw new Error("Student not found");
  if (!student.roles.includes("USER")) {
    throw new Error("Only users with USER role can be enrolled as students");
  }

  const existing = await Enrollment.findOne({ student: studentId });
  if (existing) throw new Error("Student is already enrolled");

  const course = await Course.findById(courseId);
  if (!course) throw new Error("Course not found");

  return Enrollment.create({
    student: studentId,
    course: courseId,
    currentSemester,
    batch,
  });
};

const assignTeacher = async (subjectId, teacherId) => {
  const teacher = await User.findById(teacherId);
  if (!teacher) throw new Error("Teacher not found");
  if (!teacher.roles.includes("TEACHER")) {
    throw new Error("User does not have TEACHER role");
  }

  const subject = await Subject.findByIdAndUpdate(
    subjectId,
    { teacher: teacherId },
    { new: true, runValidators: true },
  );
  if (!subject) throw new Error("Subject not found");
  return subject;
};

const createSubject = async (name, code, courseId, semester, teacherId) => {
  const course = await Course.findById(courseId);
  if (!course) throw new Error("Course not found");

  if (teacherId) {
    const teacher = await User.findById(teacherId);
    if (!teacher) throw new Error("Teacher not found");
    if (!teacher.roles.includes("TEACHER")) {
      throw new Error("User does not have TEACHER role");
    }
  }

  return Subject.create({
    name,
    code,
    course: courseId,
    semester,
    teacher: teacherId || undefined,
  });
};

const createCourse = async (name, code, duration) => {
  const existing = await Course.findOne({ code });
  if (existing) throw new Error("Course code already exists");

  return Course.create({ name, code, duration });
};

const promoteStudent = async (studentId, currentSemester) => {
  if (!Number.isInteger(currentSemester) || currentSemester < 1) {
    throw new Error("currentSemester must be a positive integer");
  }

  const enrollment = await Enrollment.findOneAndUpdate(
    { student: studentId },
    { $set: { currentSemester } },
    { new: true, runValidators: true },
  );

  if (!enrollment) throw new Error("Enrollment not found for this student");
  return enrollment;
};

const deleteSubject = async (subjectId) => {
  const subject = await Subject.findByIdAndDelete(subjectId);
  if (!subject) throw new Error("Subject not found");

  await Attendance.deleteMany({ subject: subjectId });

  return subject;
};

const listUsers = async () => {
  const users = await User.find().sort({ createdAt: -1 });
  return users.map((user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    createdAt: user.createdAt,
  }));
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
