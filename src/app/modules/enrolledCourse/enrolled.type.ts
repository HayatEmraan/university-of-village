import { Types } from 'mongoose'

export type TEnrolledMarks = {
  classTest1: number
  midTerm: number
  classTest2: number
  finalTerm: number
}

export type TEnrolled = {
  semesterRegistration: Types.ObjectId
  academicSemester: Types.ObjectId
  academicFaculty: Types.ObjectId
  academicDepartment: Types.ObjectId
  offeredCourse: Types.ObjectId
  student: Types.ObjectId
  course: Types.ObjectId
  faculty: Types.ObjectId
  isEnrolled: boolean
  courseMarks: TEnrolledMarks
  grade: 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'N/A'
  gradePoints: number
  isCompleted: boolean
}
