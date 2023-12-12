import { Types } from 'mongoose'

export interface TUFaculty {
  id: Types.ObjectId
  user: Types.ObjectId
  name: {
    firstName: string
    middleName: string
    lastName: string
  }
  gender: 'female' | 'male' | 'other'
  dateOfBirth: Date
  email: string
  contactNo: string
  emergencyNo: string
  presentAddress: string
  permanentAddress: string
  academicDepartment: Types.ObjectId
  academicFaculty: Types.ObjectId
  designation: string
  profileImage?: string
  isDeleted: boolean
}


