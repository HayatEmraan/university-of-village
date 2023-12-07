import { Schema, model } from 'mongoose'
import { TFacultyInterface } from './faculty.type'

export const facultySchema = new Schema<TFacultyInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export const facultyModel = model<TFacultyInterface>(
  'AcademicFaculty',
  facultySchema,
)
