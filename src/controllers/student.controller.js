import  studentService from "../services/student.service.js";

const getMyEnrollment = async (req, res) => {
  try {
    const enrollment = await studentService.findMyEnrollment(req.user._id);
    res.json({ success: true, data: enrollment });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const course = await studentService.findMyCourse(req.user._id);
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const getMySubjects = async (req, res) => {
  try {
    const subjects = await studentService.findMySubjects(req.user._id);
    res.json({ success: true, data: subjects });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const getMyAttendance = async (req, res) => {
  try {
    const { subject } = req.query;
    const attendance = await studentService.findMyAttendance(
      req.user._id,
      subject,
    );
    res.json({ success: true, data: attendance });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export default {
  getMyEnrollment,
  getMyCourses,
  getMySubjects,
  getMyAttendance,
};
