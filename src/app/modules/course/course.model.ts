import { Schema, model } from "mongoose";
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    trim: true,
    required: [true, "title is required"],
    unique: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: [true, "prefix is required"],
  },
  code: {
    type: Number,
    trim: true,
    required: [true, "code is required"],
  },
  credits: {
    type: Number,
    trim: true,
    required: [true, "credits is required"],
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
  ],
});

export const Course = model<TCourse>("Course", courseSchema);

export const CourseFaculty = model<TCourseFaculty>(
  "CourseFaculty",
  courseFacultySchema
);
