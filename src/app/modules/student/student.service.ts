import { Student } from "./student.interface";
import { studentModel } from "./student.model";

const createStudentInfoDB = async (student: Student) => {
  const result = await studentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await studentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await studentModel.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentInfoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
