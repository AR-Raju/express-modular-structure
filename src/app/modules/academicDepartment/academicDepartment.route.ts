import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentController } from "./academicDepartment.controller";
import { AcademicDepartmentValidations } from "./academicDepartment.validation";

const router = Router();

router.post(
  "/create-academic-department",
  //   validateRequest(
  //     AcademicDepartmentValidations.createAcademicDepartmentValidationSchema
  //   ),
  AcademicDepartmentController.createAcademicDepartment
);

router.get("/", AcademicDepartmentController.getAllAcademicDepartment);
router.get(
  "/:departmentId",
  AcademicDepartmentController.getSingleAcademicDepartment
);
router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentController.updateAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
