import { Types } from 'mongoose'

export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId
  academicFaculty: Types.ObjectId
  academicDepartment: Types.ObjectId
  course: Types.ObjectId
  faculty: Types.ObjectId
  section: number
  maxCapacity: number
  days: 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT'[]
  startTime: string
  endTime: string
}
