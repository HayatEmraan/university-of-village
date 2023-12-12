import { Schema, model } from 'mongoose'
import { TUFaculty } from './uFaculty.type'
import { facultyModel } from '../academicFaculty/faculty.schema'
import { departmentModel } from '../academicDepartment/department.schema'
import { userModel } from '../user/user.schema'

const UFacultySchema = new Schema<TUFaculty>(
  {
    id: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: userModel,
    },
    name: {
      firstName: String,
      middleName: String,
      lastName: String,
    },
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
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: departmentModel,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: facultyModel,
    },
    designation: String,
    profileImage: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

UFacultySchema.pre('find', function (next) {
  this.where({ isDeleted: false })
  next()
})

UFacultySchema.pre('findOne', function (next) {
  this.where({ isDeleted: false })
  next()
})

export const UFacultyModel = model<TUFaculty>('UFaculty', UFacultySchema)
