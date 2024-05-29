import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

type TAcademicSemesterNameCodeMapper = {
  [key: string]: string;
};
const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: "01",
  Summar: "02",
  Fall: "03",
};

const createAcademicSemesterIntoDB = async (
  semesterData: TAcademicSemester
) => {
  if (academicSemesterNameCodeMapper[semesterData.name] !== semesterData.code) {
    throw new Error("Invalid Semester Code!");
  }

  const result = await AcademicSemesterModel.create(semesterData);
  console.log(result);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (semesterId: string) => {
  const result = await AcademicSemesterModel.findById(semesterId);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester Code");
  }
  const result = await AcademicSemesterModel.findByIdAndUpdate(
    { _id: semesterId },
    payload,
    { new: true }
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
