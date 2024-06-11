import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "course created successfully!",
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res, next) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All courses retrived successfully!",
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCouseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "course retrived successfully!",
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CourseServices.updateCouseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "course retrived successfully!",
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "course deleted successfully!",
    data: result,
  });
});

const assignFacutiesWithCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "faculties assigned successfully!",
    data: result,
  });
});

const removeFacutiesWithCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const result = await CourseServices.removeFacultiesFromCourseFromDB(
    courseId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "faculties removed successfully!",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacutiesWithCourse,
  removeFacutiesWithCourse,
};
