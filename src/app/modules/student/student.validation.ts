import { z } from "zod";

const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1) === value;
};

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: "First name cannot be more than 20 characters" })
    .min(1, { message: "First name is required" })
    .refine((value) => capitalizeFirstLetter(value), {
      message: "First name is not in capitalize format",
    }),
  middleName: z.string().trim().min(1, { message: "Middle name is required" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: "Last name is not valid",
    }),
});

const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .min(1, { message: "Father's name is required" }),
  fatherOccupation: z
    .string()
    .trim()
    .min(1, { message: "Father's occupation is required" }),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, { message: "Father's contact number is required" }),
  motherName: z
    .string()
    .trim()
    .min(1, { message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .trim()
    .min(1, { message: "Mother's occupation is required" }),
  motherContactNo: z
    .string()
    .trim()
    .min(1, { message: "Mother's contact number is required" }),
});

const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Local guardian's name is required" }),
  occupation: z
    .string()
    .trim()
    .min(1, { message: "Local guardian's occupation is required" }),
  contactNo: z
    .string()
    .trim()
    .min(1, { message: "Local guardian's contact number is required" }),
  address: z
    .string()
    .trim()
    .min(1, { message: "Local guardian's address is required" }),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().trim().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female", "others"], {
        message: "Invalid gender",
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .trim()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email format" }),
      contactNo: z
        .string()
        .trim()
        .min(1, { message: "Contact number is required" }),
      emergencyContactNo: z
        .string()
        .trim()
        .min(1, { message: "Emergency contact number is required" }),
      BloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z
        .string()
        .trim()
        .min(1, { message: "Present address is required" }),
      permanentAddress: z
        .string()
        .trim()
        .min(1, { message: "Permanent address is required" }),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().trim().optional(),
      admissionSemester: z.string(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
