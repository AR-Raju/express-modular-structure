import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyControllers } from "./faculty.controller";
import { facultyValidations } from "./faculty.validation";

const router = Router();

router.get("/", auth("admin", "faculty"), FacultyControllers.getAllFaculties);
router.get("/:id", FacultyControllers.getSingleFaculty);
router.patch(
  "/:id",
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);
router.delete("/:id", FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
