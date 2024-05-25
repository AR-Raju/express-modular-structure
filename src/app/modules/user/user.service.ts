import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createStudentInfoDB = async (password: string, studentData: TStudent) => {
  //   create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_pass as string);

  //   set student role
  userData.role = "student";

  //   set manually generated id
  userData.id = "203000001";

  // create a user
  const result = await UserModel.create(userData);

  //   create a student
  if (Object.keys(result).length) {
    studentData.id = result.id;
    studentData.user = result._id;

    const newStudent = Student.create(studentData);

    return newStudent;
  }
};

export const UserServices = {
  createStudentInfoDB,
};
