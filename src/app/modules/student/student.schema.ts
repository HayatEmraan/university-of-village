import { Schema, model } from 'mongoose'
import { TStudent } from './student.type'
import { AcademicSemesterModel } from '../academicSemester/academic.schema'
import { departmentModel } from '../academicDepartment/department.schema'
import { userModel } from '../user/user.schema'
import AppError from '../../errors/appError'

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
    user: {
      type: Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
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
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: AcademicSemesterModel,
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: departmentModel,
      required: true,
    },
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

studentSchema.pre('findOneAndUpdate', async function (next) {
  const isExist = await this.model.findOne(this.getQuery())
  if (!isExist) {
    throw new AppError(404, 'Student not found')
  }
  next()
})

studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})



export const studentModel = model<TStudent>('student', studentSchema)
