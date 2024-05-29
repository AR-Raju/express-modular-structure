import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterController } from "./academicSemester.controller";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const router = Router();

router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidations.createAcamedicSemesterValidation),
  AcademicSemesterController.createAcademicSemester
);
router.get("/", AcademicSemesterController.getAllAcademicSemester);
router.get("/:semesterId", AcademicSemesterController.getAllAcademicSemester);
router.patch(
  "/:semesterId",
  validateRequest(AcademicSemesterValidations.updateAcamedicSemesterValidation),
  AcademicSemesterController.updateAcademicSemester
);

export const AcademicSemesterRoutes = router;
