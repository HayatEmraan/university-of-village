import { Types } from 'mongoose'

export type TAdmin = {
  id: string
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
  designation: string
  managementDepartment: string
  profileImage?: string
  isDeleted: boolean
}
