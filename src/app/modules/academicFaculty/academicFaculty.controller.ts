import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculy = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty created successfully!",
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty retrieved successfully!",
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty retrieved successfully!",
    data: result,
  });
});

const upateAcademicFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty updated successfully!",
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculy,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  upateAcademicFaculty,
};
