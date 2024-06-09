import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const getAllAdmins = catchAsync(async (req, res, next) => {
  const result = await AdminServices.getAllAdminFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All admin retrived successfully!",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res, next) => {
  const { adminId } = req.params;
  const { admin: adminData } = req.body;
  const result = await AdminServices.updateAdminIntoDB(adminId, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "admin upated successfully!",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res, next) => {
  const { adminId } = req.params;
  const result = await AdminServices.deleteAdminFromDB(adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "admin deleted successfully!",
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};
