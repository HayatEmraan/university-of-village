import { Schema, model } from 'mongoose'
import { TOfferedCourse } from './offered.type'

const OfferedCourseSchema = new Schema<TOfferedCourse>(
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
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'UFaculty',
      required: true,
    },
    section: Number,
    maxCapacity: {
      type: Number,
      required: true,
    },
    days: {
      type: [String],
      enum: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export const OfferedCourseModel = model<TOfferedCourse>(
  'OfferedCourse',
  OfferedCourseSchema,
)
