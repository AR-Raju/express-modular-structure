import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await AcademicDepartmentServices.createAcademicDeparmentInfoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department created successfully!",
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic departments are retrived successfully!",
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department is retrived successfully!",
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params;

  const result = await AcademicDepartmentServices.upateAcademicDepartmentIntoDB(
    departmentId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department updated successfully!",
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
