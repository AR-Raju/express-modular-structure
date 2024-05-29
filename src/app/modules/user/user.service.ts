import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentInfoDB = async (password: string, payload: TStudent) => {
  //   create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_pass as string);

  //   set student role
  userData.role = "student";

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester
  );

  //   set manually generated id
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  // create a user
  const result = await UserModel.create(userData);

  //   create a student
  if (Object.keys(result).length) {
    payload.id = result.id;
    payload.user = result._id;

    const newStudent = Student.create(payload);

    return newStudent;
  }
};

export const UserServices = {
  createStudentInfoDB,
};
