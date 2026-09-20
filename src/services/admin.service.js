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

const listCourses = async () => {
  const courses = await Course.find().sort({ createdAt: -1 });
  return courses.map((course) => ({
    _id: course._id,
    name: course.name,
    code: course.code,
    duration: course.duration,
    createdAt: course.createdAt,
  }));
};

const listTeachers = async () => {
  const teachers = await User.find({ roles: "TEACHER" }).sort({
    createdAt: -1,
  });
  return teachers.map((teacher) => ({
    _id: teacher._id,
    name: teacher.name,
    email: teacher.email,
    createdAt: teacher.createdAt,
  }));
};

const listSubjects = async () => {
  const subjects = await Subject.find()
    .populate("course")
    .populate("teacher")
    .sort({ createdAt: -1 });
  return subjects.map((subject) => ({
    _id: subject._id,
    name: subject.name,
    code: subject.code,
    course: subject.course
      ? { _id: subject.course._id, name: subject.course.name }
      : null,
    semester: subject.semester,
    teacher: subject.teacher
      ? { _id: subject.teacher._id, name: subject.teacher.name }
      : null,
    createdAt: subject.createdAt,
  }));
};

const listEnrollments = async () => {
  const enrollments = await Enrollment.find()
    .populate("student")
    .populate("course")
    .sort({ createdAt: -1 });
  return enrollments.map((enrollment) => ({
    _id: enrollment._id,
    student: enrollment.student
      ? {
          _id: enrollment.student._id,
          name: enrollment.student.name,
          email: enrollment.student.email,
        }
      : null,
    course: enrollment.course
      ? { _id: enrollment.course._id, name: enrollment.course.name }
      : null,
    currentSemester: enrollment.currentSemester,
    batch: enrollment.batch,
    createdAt: enrollment.createdAt,
  }));
};

const updateCourse = async (courseId, name, code, duration) => {
  const course = await Course.findById(courseId);
  if (!course) throw new Error("Course not found");

  if (code && code !== course.code) {
    const existing = await Course.findOne({ code });
    if (existing) throw new Error("Course code already exists");
  }

  course.name = name || course.name;
  course.code = code || course.code;
  course.duration = duration || course.duration;

  await course.save();
  return course;
};

const deleteCourse = async (courseId) => {
  const course = await Course.findByIdAndDelete(courseId);
  if (!course) throw new Error("Course not found");

  await Subject.deleteMany({ course: courseId });
  await Enrollment.deleteMany({ course: courseId });

  return { message: "Course deleted successfully", success: true };
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error("User not found");

  await Enrollment.deleteMany({ student: userId });
  await Subject.updateMany({ teacher: userId }, { $unset: { teacher: "" } });

  return { message: "User deleted successfully", success: true };
};

const updateSubject = async (
  subjectId,
  name,
  code,
  courseId,
  semester,
  teacherId,
) => {
  const subject = await Subject.findById(subjectId);
  if (!subject) throw new Error("Subject not found");

  if (code && code !== subject.code) {
    const existing = await Subject.findOne({ code });
    if (existing) throw new Error("Subject code already exists");
  }

  if (courseId && courseId !== subject.course.toString()) {
    const course = await Course.findById(courseId);
    if (!course) throw new Error("Course not found");
    subject.course = courseId;
  }

  if (teacherId && teacherId !== subject.teacher?.toString()) {
    const teacher = await User.findById(teacherId);
    if (!teacher) throw new Error("Teacher not found");
    if (!teacher.roles.includes("TEACHER")) {
      throw new Error("User does not have TEACHER role");
    }
    subject.teacher = teacherId;
  }

  subject.name = name || subject.name;
  subject.code = code || subject.code;
  subject.semester = semester || subject.semester;

  await subject.save();
  return subject;
};

const listSubjectById = async (subjectId) => {
  const subject = await Subject.findById(subjectId)
    .populate("course")
    .populate("teacher");
  if (!subject) throw new Error("Subject not found");

  return {
    _id: subject._id,
    name: subject.name,
    code: subject.code,
    course: subject.course
      ? { _id: subject.course._id, name: subject.course.name }
      : null,
    semester: subject.semester,
    teacher: subject.teacher
      ? { _id: subject.teacher._id, name: subject.teacher.name }
      : null,
    createdAt: subject.createdAt,
  };
};

const listCourseById = async (courseId) => {
  const course = await Course.findById(courseId);
  if (!course) throw new Error("Course not found");

  return {
    _id: course._id,
    name: course.name,
    code: course.code,
    duration: course.duration,
    createdAt: course.createdAt,
  };
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
