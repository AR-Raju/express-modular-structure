import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyControllers } from "./faculty.controller";
import { facultyValidations } from "./faculty.validation";

const router = Router();

router.get("/", FacultyControllers.getAllFaculties);
router.patch(
  "/:facultyId",
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);
router.delete("/:facultyId", FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
