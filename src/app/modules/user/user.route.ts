import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidations } from "../admin/admin.validation";
import { facultyValidations } from "../faculty/faculty.validation";
import { studentValidations } from "../student/student.validation";
import { UserController } from "./user.controller";
const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserController.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
