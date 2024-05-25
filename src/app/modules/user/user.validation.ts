import { z } from "zod";
const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password is needed while creating account",
    })
    .max(20, { message: "Password can not be more than 20 chracters" })
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
