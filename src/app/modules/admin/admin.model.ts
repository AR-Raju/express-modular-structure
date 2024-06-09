import { Schema, model } from "mongoose";
import { BloodGroup, Gender } from "./admin.constant";
import { AdminModel, TAdmin, TUserName } from "./admin.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [20, "First name cannot be more than 20 characters"],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    maxlength: [20, "Last name cannot be more than 20 characters"],
  },
});

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
    name: {
      type: userNameSchema,
      required: [true, "Name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: [...Gender],
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, "contact no is required"],
    },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact no is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: [...BloodGroup],
        message: "{VALUE} is not a valid bloodgroup",
      },
      required: [true, "bloodGroup is required"],
    },
    presentAddress: {
      type: String,
      required: [true, "present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "permanent address is required"],
    },
    profileImg: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

adminSchema.virtual("FullName").get(function () {
  return (
    this?.name?.firstName +
    " " +
    this?.name?.middleName +
    " " +
    this?.name?.lastName
  );
});

adminSchema.pre("find", function (next) {
  this.find({ idDeleted: { $ne: true } });
  next();
});

adminSchema.pre("findOne", function (next) {
  this.findOne({ idDeleted: { $ne: true } });
  next();
});

adminSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

adminSchema.statics.isUserExists = async function (id: string) {
  const isUserExists = await Admin.findOne({ id });
  return isUserExists;
};

export const Admin = model<TAdmin, AdminModel>("Admin", adminSchema);
