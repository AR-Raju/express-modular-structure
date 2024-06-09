import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { AdminSearchableFields } from "./admin.constant";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const searchQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .paginate()
    .filter()
    .fields();

  const result = await searchQuery.modelQuery;
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remaining } = payload;

  let modifiedUpdateData: Record<string, unknown> = { ...remaining };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = Admin.findByIdAndUpdate({ _id: id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedAdmin = await Admin.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete admin");
    }
    // get user _id from deletedAdmin
    const userId = deletedAdmin.user;
    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    session.endSession();
    return deletedAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(err);
  }
};

export const AdminServices = {
  getAllAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
