import Jwt from "jsonwebtoken";
import { TUserRole } from "../user/user.interface";

export const createToken = (
  jwtPayload: { userId: string; role: TUserRole },
  secret: string,
  expiresIn: string
) => {
  return Jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
