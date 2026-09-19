import adminController from "../controllers/admin.controller.js";
import auth from "../middlewares/auth.js";
import express from "express";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

const router = express.Router();

router.get("/users", auth, roleBasedAuth("ADMIN"), adminController.listUsers);


router.patch(
  "/users/:userId/role",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.updateUserRole,
);

router.post(
  "/enrollments",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.enrollStudent,
);

router.post(
  "/subjects",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.createSubject,
);

router.patch(
  "/subjects/:subjectId/teacher",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.assignTeacher,
);

router.post(
  "/courses",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.createCourse,
);

router.patch(
  "/enrollments/:studentId/semester",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.promoteStudent,
);

router.delete(
  "/subjects/:subjectId",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.deleteSubject,
);


export default router;
