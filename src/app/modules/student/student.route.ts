import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { studentControllers } from "./student.controller";
import { studentValidations } from "./student.validation";

const router = express.Router();

router.get("/", studentControllers.getAllStudents);
router.get("/:id", studentControllers.getSingleStudent);
router.delete("/:id", studentControllers.deleteSingleStudent);
router.patch(
  "/:id",
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentControllers.updateStudent
);

export const studentRoutes = router;
