import Joi from "joi";

const capitalizeFirstLetter = (value: string, helpers: any) => {
  if (value.charAt(0).toUpperCase() + value.slice(1) !== value) {
    return helpers.message(`"${value}" is not in capitalize format`);
  }
  return value;
};

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .custom(capitalizeFirstLetter, "Capitalize first letter validation"),
  middleName: Joi.string().trim().required(),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[a-zA-Z]+$/, "{#label} is not valid"),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  fatherOccupation: Joi.string().trim().required(),
  fatherContactNo: Joi.string().trim().required(),
  motherName: Joi.string().trim().required(),
  motherOccupation: Joi.string().trim().required(),
  motherContactNo: Joi.string().trim().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().trim().required(),
  contactNo: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string()
    .trim()
    .valid("male", "female", "others")
    .required()
    .messages({
      "any.only":
        'The gender field can be only one of the following: "male", "female", or "others"',
    }),
  dateOfBirth: Joi.date().optional(),
  email: Joi.string().trim().email().required(),
  contactNo: Joi.string().trim().required(),
  emergencyContactNo: Joi.string().trim().required(),
  BloodGroup: Joi.string()
    .trim()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .messages({
      "any.only": "{#label} is not a valid blood group",
    }),
  presentAddress: Joi.string().trim().required(),
  permanentAddress: Joi.string().trim().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().trim().optional(),
  isActive: Joi.string()
    .trim()
    .valid("active", "block")
    .default("active")
    .messages({
      "any.only":
        '{#label} is not a valid status. Status can be either "active" or "block"',
    }),
});

export default studentValidationSchema;
