import { Schema, model } from 'mongoose'
import { TAdmin } from './admin.interface'
import { userModel } from '../user/user.schema'

const AdminSchema = new Schema<TAdmin>(
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
    designation: String,
    managementDepartment: String,
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

export const AdminModel = model<TAdmin>('Admin', AdminSchema)
