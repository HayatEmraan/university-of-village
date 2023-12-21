import { Types } from 'mongoose'

export type TDays = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT'[]

export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId
  academicSemester: Types.ObjectId
  academicFaculty: Types.ObjectId
  academicDepartment: Types.ObjectId
  course: Types.ObjectId
  faculty: Types.ObjectId
  section: number
  maxCapacity: number
  days: TDays
  startTime: string
  endTime: string
}
