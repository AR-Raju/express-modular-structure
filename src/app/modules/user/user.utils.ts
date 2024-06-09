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
  return lastStudent?.id ? lastStudent.id : undefined;
};

// year semestercode 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString(); // by default 0000

  const lastStudentId = await findLastStudentId();
  //   2040 01 0001
  const lastStudentYear = lastStudentId?.substring(0, 4); // 2040
  const lastStudentSemestercode = lastStudentId?.substring(4, 6); // 01
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemestercode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

const findLastFacultyId = async () => {
  const lastFaculty = await UserModel.findOne(
    {
      role: "faculty",
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
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();

  const lastFacultyId = await findLastFacultyId();
  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `F-${incrementId}`;
  return incrementId;
};

const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    {
      role: "admin",
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

  return lastAdmin?.id ? lastAdmin?.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currrentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currrentId = lastAdminId.substring(2);
  }
  let incrementId = (Number(currrentId) + 1).toString().padStart(4, "0");
  incrementId = `A-${incrementId}`;
  return incrementId;
};
