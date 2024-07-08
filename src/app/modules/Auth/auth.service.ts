import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUserRole } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";

const loginUsers = async (payload: TLoginUser) => {
  // check if user exists
  const user = await User.findOne({ id: payload?.id });

  if (!(await User.isUserExistsByCustomId(payload?.id))) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  // check if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  if (
    !(await User.isPasswordMatched(payload?.password, user?.password as string))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched!");
  }

  //   create token and send to the client
  const jwtPayload = {
    userId: user?.id as string,
    role: user?.role as TUserRole,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const refreshTokenFromCookie = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { userId } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  const jwtPayload = {
    userId: user?.id as string,
    role: user?.role as TUserRole,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUsers,
  refreshTokenFromCookie,
};
