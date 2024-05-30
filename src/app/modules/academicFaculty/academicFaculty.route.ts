import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyController } from "./academicFaculty.controller";
import { AcademicFacultyValidations } from "./academicFaculty.validation";

const router = Router();

router.post(
  "/create-academic-faculty",
  validateRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyController.createAcademicFaculy
);
router.get("/", AcademicFacultyController.getAllAcademicFaculty);
router.get("/:facultyId", AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyController.upateAcademicFaculty
);

export const AcademicFacultyRoutes = router;
