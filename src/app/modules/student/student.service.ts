import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentInfoDB = async (studentData: TStudent) => {
  // const result = await studentModel.create(student); // built in static method
  const student = new Student(studentData);
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User already exists!");
  }
  const result = await student.save();
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);

  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentInfoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
