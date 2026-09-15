import teacherService from "../services/teacher.service.js";

const getMySubjects = async (req, res) => {
  try {
    const subjects = await teacherService.findMySubjects(req.user._id);
    res.json({ success: true, data: subjects });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getSubjectStudents = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const students = await teacherService.findSubjectStudents(
      req.user._id,
      subjectId,
    );
    res.json({ success: true, data: students });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const markAttendance = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { date, records } = req.body;

    const attendance = await teacherService.markAttendance(
      req.user._id,
      subjectId,
      date,
      records,
    );
    res.status(201).json({ success: true, data: attendance });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getSubjectAttendance = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const attendance = await teacherService.findSubjectAttendance(
      req.user._id,
      subjectId,
    );
    res.json({ success: true, data: attendance });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { subjectId, attendanceId } = req.params;
    const { records } = req.body;

    const attendance = await teacherService.updateAttendance(
      req.user._id,
      subjectId,
      attendanceId,
      records,
    );
    res.json({ success: true, data: attendance });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export default {
  getMySubjects,
  getSubjectStudents,
  markAttendance,
  getSubjectAttendance,
  updateAttendance,
};
