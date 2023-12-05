import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academic.interface'
import { AcademicCode, Months } from './academic.const'

const AcademicSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

AcademicSchema.pre('save', async function () {
  const result = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  })

  if (result) {
    throw new Error('Semester already exists')
  }
})

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSchema,
)
