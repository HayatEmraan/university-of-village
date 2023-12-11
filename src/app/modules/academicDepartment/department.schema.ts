import { Schema, model } from 'mongoose'
import { TDepartmentInterface } from './department.type'
import { facultyModel } from '../academicFaculty/faculty.schema'
import AppError from '../../errors/appError'

const departmentSchema = new Schema<TDepartmentInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: facultyModel,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

departmentSchema.pre('findOneAndUpdate', async function (next) {
  const isExist = await this.model.findById(this.getQuery()._id)
  if (!isExist) {
    return next(new AppError(404, 'Department not found'))
  }
  next()
})

export const departmentModel = model<TDepartmentInterface>(
  'AcademicDepartment',
  departmentSchema,
)
