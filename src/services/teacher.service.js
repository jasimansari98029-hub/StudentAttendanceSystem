import Subject from "../models/Subjects.js";
import Enrollment from "../models/Enrollments.js";
import Attendance from "../models/Attendances.js";
import User from "../models/Users.js";

const findMySubjects = async (teacherId) => {
  return Subject.find({ teacher: teacherId });
};

const getOwnedSubject = async (teacherId, subjectId) => {
  const subject = await Subject.findOne({ _id: subjectId, teacher: teacherId });
  if (!subject) throw new Error("Subject not found or not assigned to you");
  return subject;
};

const findSubjectStudents = async (teacherId, subjectId) => {
  const subject = await getOwnedSubject(teacherId, subjectId);

  const enrollments = await Enrollment.find({
    course: subject.course,
    currentSemester: subject.semester,
  });

  const studentIds = enrollments.map((e) => e.student);
  return User.find({ _id: { $in: studentIds } }).select("name email phone");
};

const markAttendance = async (teacherId, subjectId, date, records) => {
  await getOwnedSubject(teacherId, subjectId);

  if (!date) throw new Error("date is required");
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error("records must be a non-empty array");
  }

  const existing = await Attendance.findOne({ subject: subjectId, date });
  if (existing) throw new Error("Attendance already marked for this date");

  return Attendance.create({
    subject: subjectId,
    markedBy: teacherId,
    date,
    records,
  });
};

const findSubjectAttendance = async (teacherId, subjectId) => {
  await getOwnedSubject(teacherId, subjectId);

  return Attendance.find({ subject: subjectId })
    .populate("records.student", "name email")
    .sort({ date: -1 });
};

const updateAttendance = async (
  teacherId,
  subjectId,
  attendanceId,
  records,
) => {
  await getOwnedSubject(teacherId, subjectId);

  if (!Array.isArray(records) || records.length === 0) {
    throw new Error("records must be a non-empty array");
  }

  const attendance = await Attendance.findOneAndUpdate(
    { _id: attendanceId, subject: subjectId },
    { $set: { records } },
    { new: true, runValidators: true },
  );

  if (!attendance) throw new Error("Attendance record not found");
  return attendance;
};

export default {
  findMySubjects,
  getOwnedSubject,
  findSubjectStudents,
  markAttendance,
  findSubjectAttendance,
  updateAttendance,
};
