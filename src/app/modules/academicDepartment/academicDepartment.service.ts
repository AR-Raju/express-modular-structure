import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";

const createAcademicDeparmentInfoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result =
    await AcademicDepartmentModel.find().populate("academicFaculty");
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id);
  return result;
};

const upateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDeparmentInfoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  upateAcademicDepartmentIntoDB,
};
