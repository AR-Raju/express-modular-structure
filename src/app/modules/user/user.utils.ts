import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

// find last student id
const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  // 204001 0001
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// year semestercode 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  const currentId = (await findLastStudentId()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
