import { Model } from "mongoose";

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: "male" | "female" | "others";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  BloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: "active" | "block";
  isDeleted: boolean;
};

// for creating instance method

// export type TStudentMethod = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type TStudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   TStudentMethod
// >;

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
