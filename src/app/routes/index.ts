import { Router } from "express";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { studentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: studentRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
