import express from "express";

const router = express.Router();

import studentController from "../controllers/student.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import auth from "../middlewares/auth.js";

router.get(
  "/my-attendance",
  auth,
  roleBasedAuth("USER"),
  studentController.getMyAttendance,
);

router.get(
  "/my-courses",
  auth,
  roleBasedAuth("USER"),
  studentController.getMyCourses,
);

router.get(
  "/my-subjects",
  auth,
  roleBasedAuth("USER"),
  studentController.getMySubjects,
);

router.get(
  "/my-enrollment",
  auth,
  roleBasedAuth("USER"),
  studentController.getMyEnrollment,
);

export default router;
