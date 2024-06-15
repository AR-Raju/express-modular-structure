import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationControllers } from "./semesterRegistration.controller";
import { semesterRegistrationValidations } from "./semesterRegistration.validation";

const router = Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.createSemesterRegistration
);

export const SemesterRegistrationRoutes = router;
