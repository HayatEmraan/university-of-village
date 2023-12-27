import { Schema, model } from 'mongoose'
import { TEnrolled } from './enrolled.type'

const marksSchema = new Schema(
  {
    classTest1: {
      type: Number,
      default: 0,
    },
    midTerm: {
      type: Number,
      default: 0,
    },
    classTest2: {
      type: Number,
      default: 0,
    },
    finalTerm: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  },
)

const enrolledSchema = new Schema<TEnrolled>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: 'SemesterRegistration',
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    offeredCourse: {
      type: Schema.Types.ObjectId,
      ref: 'OfferedCourse',
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isEnrolled: {
      type: Boolean,
      default: false,
    },
    courseMarks: {
      type: marksSchema,
      default: {
        classTest1: 0,
        midTerm: 0,
        classTest2: 0,
        finalTerm: 0,
      },
    },
    grade: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'E', 'F', 'N/A'],
      default: 'N/A',
    },
    gradePoints: {
      type: Number,
      min: 0,
      max: 4,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export const EnrolledModel = model<TEnrolled>('Enrolled', enrolledSchema)
