import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";

const getAllFaculties = catchAsync(async (req, res, next) => {
  const result = await FacultyServices.getAllFacultyFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All faculty retrived successfully!",
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single faculty retrived successfully!",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { faculty: facultyData } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(id, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "faculty upated successfully!",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "faculty deleted successfully!",
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
