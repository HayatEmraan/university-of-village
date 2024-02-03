import { Types } from 'mongoose'

export type TSemesterStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED'

export type TSemesterRegistration = {
  academicSemester: Types.ObjectId
  status: TSemesterStatus
  startDate: Date
  endDate: Date
  minCredits: number
  maxCredits: number
}
