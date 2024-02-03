import { Types } from 'mongoose'

export interface TDepartmentInterface {
  name: string
  academicFaculty: Types.ObjectId
}
