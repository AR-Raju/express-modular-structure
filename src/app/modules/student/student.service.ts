import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { studentSearchAbleFields } from "./student.constant";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };
  // const studentSearchAbleFields = ["email", "name.firstName", "presentAddress"];

  // try {
  //   // Initialize a basic query that matches all documents
  //   let searchQuery = Student.find({});

  //   // Add search term condition if it is present
  //   if (query?.searchTerm) {
  //     const searchTerm = query.searchTerm as string;
  //     searchQuery = Student.find({
  //       $or: studentSearchAbleFields.map((field) => ({
  //         [field]: { $regex: searchTerm, $options: "i" },
  //       })),
  //     });
  //   }

  //   // Exclude special query parameters from the filter query
  //   const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  //   excludeFields.forEach((el) => delete queryObj[el]);

  //   console.log({ query, queryObj });

  //   // Apply additional filters
  //   searchQuery = searchQuery
  //     .find(queryObj)
  //     .populate("admissionSemester")
  //     .populate({
  //       path: "academicDepartment",
  //       populate: {
  //         path: "academicFaculty",
  //       },
  //     });

  //   // Apply sorting
  //   if (query?.sort) {
  //     const sort = query.sort as string;
  //     searchQuery = searchQuery.sort(sort);
  //   } else {
  //     searchQuery = searchQuery.sort("-createdAt");
  //   }

  //   // Apply pagination
  //   let limit = 10; // Default limit
  //   let page = 1;
  //   if (query?.limit) {
  //     limit = Number(query.limit);
  //   }
  //   if (query?.page) {
  //     page = Number(query.page);
  //   }
  //   const skip = (page - 1) * limit;
  //   searchQuery = searchQuery.skip(skip).limit(limit);

  //   // Apply field selection
  //   if (query?.fields) {
  //     const fields = (query.fields as string).split(",").join(" ");
  //     searchQuery = searchQuery.select(fields);
  //   } else {
  //     searchQuery = searchQuery.select("-__v"); // Exclude __v by default
  //   }
  try {
    const searchQuery = new QueryBuilder(Student.find(), query)
      .search(studentSearchAbleFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await searchQuery.modelQuery;
    return result;
  } catch (err) {
    console.error("Error fetching students:", err);
    throw new Error("Error fetching students");
  }
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  // const result = await Student.aggregate([{ $match: { id: id } }]);

  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }
    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    session.commitTransaction();
    session.endSession();

    return deletedStudent;
  } catch (err) {
    session.abortTransaction();
    session.endSession();
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remaining } = payload;

  let modifiedStudentData: Record<string, unknown> = { ...remaining };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudentData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudentData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudentData[`localGuardian.${key}`] = value;
    }
  }

  const updatedStudent = await Student.findOneAndUpdate(
    { id },
    modifiedStudentData,
    { new: true }
  );

  return updatedStudent;
};

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateStudentIntoDB,
};
