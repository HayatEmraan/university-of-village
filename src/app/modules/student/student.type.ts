import { Types } from 'mongoose'

type TGuardian = {
  father: {
    fatherName: string
    fatherOccupation: string
    fatherContactNo: string
  }
  mother: {
    motherName: string
    motherOccupation: string
    motherContactNo: string
  }
}

type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
}

export type TStudent = {
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
  guardian: TGuardian
  localGuardian: TLocalGuardian
  academicSemester: Types.ObjectId
  academicDepartment: Types.ObjectId
  profileImage?: string
  isDeleted: boolean
}
