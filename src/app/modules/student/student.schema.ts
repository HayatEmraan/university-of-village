import { Schema, Types, model } from 'mongoose'
import { TStudent } from './student.type'

const NameSchema = new Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
  },
  { _id: false },
)

const GuardianSchema = new Schema(
  {
    father: {
      fatherName: String,
      fatherOccupation: String,
      fatherContactNo: String,
    },
    mother: {
      motherName: String,
      motherOccupation: String,
      motherContactNo: String,
    },
  },
  { _id: false },
)

const LocalGuardianSchema = new Schema(
  {
    name: String,
    occupation: String,
    contactNo: String,
  },
  { _id: false },
)

export const studentSchema = new Schema<TStudent>(
  {
    id: String,
    user: Types.ObjectId,
    name: NameSchema,
    gender: {
      type: String,
      enum: ['female', 'male', 'other'],
    },
    dateOfBirth: Date,
    email: String,
    contactNo: String,
    emergencyNo: String,
    presentAddress: String,
    permanentAddress: String,
    guardian: GuardianSchema,
    localGuardian: LocalGuardianSchema,
    academicSemester: Types.ObjectId,
    profileImage: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export const studentModel = model<TStudent>('student', studentSchema)
