import bcrypt from "bcrypt";
import httpStatus from "http-status";
import Jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUsers = async (payload: TLoginUser) => {
  // check if user exists
  const user = await User.findOne({ id: payload?.id });

  if (!(await User.isUerExistsByCustomId(payload?.id))) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  // check if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  // check if password is matched
  const isPasswordMatched = bcrypt.compare(
    payload?.password,
    user?.password as string
  );

  if (
    !(await User.isPasswordMatched(payload?.password, user?.password as string))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched!");
  }

  //   create token and send to the client
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = Jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUsers,
};
