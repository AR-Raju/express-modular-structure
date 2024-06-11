import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseControllers } from "./course.controller";
import { courseValidations } from "./course.validation";

const router = Router();

router.post(
  "/create-course",
  validateRequest(courseValidations.createCourseValidatinoSchema),
  CourseControllers.createCourse
);
router.get("/", CourseControllers.getAllCourses);
router.get("/:id", CourseControllers.getSingleCourse);
router.delete("/:id", CourseControllers.deleteCourse);
router.patch(
  "/:id",
  validateRequest(courseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse
);

router.put(
  "/:courseId/assign-faculties",
  validateRequest(courseValidations.courseFacultyValidationSchema),
  CourseControllers.assignFacutiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  validateRequest(courseValidations.courseFacultyValidationSchema),
  CourseControllers.removeFacutiesWithCourse
);

export const CourseRoutes = router;
