import adminController from "../controllers/admin.controller.js";
import auth from "../middlewares/auth.js";
import express from "express";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";


const router = express.Router();

router.patch(
  "/users/:userId/role",
  auth,  
  roleBasedAuth("ADMIN"),
  adminController.updateUserRole,
);

export default router;
