import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { AuthValidations } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUsers
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

export const AuthRoutes = router;
