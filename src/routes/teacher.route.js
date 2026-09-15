import express from "express";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import teacherController from "../controllers/teacher.controller.js";

const router = express.Router();

router.get(
  "/my-subjects",
  auth,
  roleBasedAuth("TEACHER"),
  teacherController.getMySubjects,
);

router.get(
  "/subjects/:subjectId/students",
  auth,
  roleBasedAuth("TEACHER"),
  teacherController.getSubjectStudents,
);

router.post(
  "/subjects/:subjectId/attendance",
  auth,
  roleBasedAuth("TEACHER"),
  teacherController.markAttendance,
);

router.get(
  "/subjects/:subjectId/attendance",
  auth,
  roleBasedAuth("TEACHER"),
  teacherController.getSubjectAttendance,
);

router.patch(
  "/subjects/:subjectId/attendance/:attendanceId",
  auth,
  roleBasedAuth("TEACHER"),
  teacherController.updateAttendance,
);

export default router;
