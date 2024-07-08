import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUsers = catchAsync(async (req, res, next) => {
  const result = await AuthServices.loginUsers(req.body);
  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshTokenFromCookie(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token retrieved successfully!",
    data: result,
  });
});

export const AuthControllers = {
  loginUsers,
  refreshToken,
};
