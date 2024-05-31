import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { studentControllers } from "./student.controller";
import { studentValidations } from "./student.validation";

const router = express.Router();

router.get("/", studentControllers.getAllStudents);
router.get("/:studentId", studentControllers.getSingleStudent);
router.delete("/:studentId", studentControllers.deleteSingleStudent);
router.patch(
  "/:studentId",
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentControllers.updateStudent
);

export const studentRoutes = router;
