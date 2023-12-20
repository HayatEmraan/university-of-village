import { Schema, model } from 'mongoose'
import { TSemesterRegistration } from './semester.type'

const SemesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['UPCOMING', 'ONGOING', 'COMPLETED'],
    },
    startDate: Date,
    endDate: Date,
    minCredits: {
      type: Number,
      default: 3,
    },
    maxCredits: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)


export const SemesterRegistrationModel = model<TSemesterRegistration>(
  'SemesterRegistration',
  SemesterRegistrationSchema,
)
