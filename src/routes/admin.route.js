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

router.get(
  "/courses",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.listCourses,
);

router.get(
  "/teachers",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.listTeachers,
);

router.get(
  "/subjects",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.listSubjects,
);

router.get(
  "/enrollments",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.listEnrollments,
);

router.patch(
  "/courses/:courseId/",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.updateCourse,
);

router.delete(
  "/courses/:courseId",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.deleteCourse,
);

router.delete(
  "/users/:userId",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.deleteUser,
);

router.patch(
  "/subjects/:subjectId",
  auth,
  roleBasedAuth("ADMIN"),
  adminController.updateSubject,
);

router.get('/subjects/:subjectId/', auth, roleBasedAuth('ADMIN'), adminController.listSubjectById);

router.get('/courses/:courseId/', auth, roleBasedAuth('ADMIN'), adminController.listCourseById);

export default router;
