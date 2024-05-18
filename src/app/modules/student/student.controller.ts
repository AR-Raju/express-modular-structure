import { Request, Response } from "express";
import { z } from "zod";
import { studentServices } from "./student.service";
import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    // data validation using zod
    const zodParsedData = studentValidationSchema.parse(studentData);

    // will call service func to send this data
    const result = await studentServices.createStudentInfoDB(zodParsedData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "something went wrong",
    //     error: error.details,
    //   });
    // }

    // send response
    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(500).json({
        success: false,
        message: err.message || "Zod error catch",
        errorMessage: err,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "Unpected error not zod",
        errorMessage: err,
      });
    }
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: "Students are retrieve successfully",
      data: result,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(500).json({
        success: false,
        message: err.message || "Zod error catch",
        errorMessage: err,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "Unpected error not zod",
        errorMessage: err,
      });
    }
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Single Student retrieve successfully",
      data: result,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(500).json({
        success: false,
        message: err.message || "Zod error catch",
        errorMessage: err,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "Unpected error not zod",
        errorMessage: err,
      });
    }
  }
};

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Single Student deleted successfully",
      data: result,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(500).json({
        success: false,
        message: err.message || "Zod error catch",
        errorMessage: err,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "Unpected error not zod",
        errorMessage: err,
      });
    }
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
