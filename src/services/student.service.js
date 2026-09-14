import Enrollment from "../models/Enrollments.js";
import Subject from "../models/Subjects.js";
import Attendance from "../models/Attendances.js";
import Course from "../models/Courses.js";

const findMyEnrollment = async (studentId) => {
  const enrollment = await Enrollment.findOne({ student: studentId });
  if (!enrollment) throw new Error("Not enrolled in any course");

  const course = await Course.findById(enrollment.course).select(
    "name code duration",
  );

  return {
    _id: enrollment._id,
    student: enrollment.student,
    currentSemester: enrollment.currentSemester,
    batch: enrollment.batch,
    course,
  };
};

const findMyCourse = async (studentId) => {
  const enrollment = await Enrollment.findOne({ student: studentId });
  if (!enrollment) throw new Error("Not enrolled in any course");

  const course = await Course.findById(enrollment.course);
  if (!course) throw new Error("Enrolled course not found");
  return course;
};

const findMySubjects = async (studentId) => {
  const enrollment = await Enrollment.findOne({ student: studentId });
  if (!enrollment) throw new Error("Not enrolled in any course");

  return Subject.find({
    course: enrollment.course,
    semester: enrollment.currentSemester,
  }).populate("teacher", "name email");
};

const findMyAttendance = async (studentId, subjectId) => {
  const filter = { "records.student": studentId };
  if (subjectId) filter.subject = subjectId;

  return Attendance.find(filter)
    .select("subject date records.$")
    .populate("subject", "name code")
    .sort({ date: -1 });
};

export default {
  findMyEnrollment,
  findMyCourse,
  findMySubjects,
  findMyAttendance,
};
