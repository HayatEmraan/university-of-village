import express from 'express'
import {
  CreateAdminUser,
  CreateFaculty,
  CreateStudent,
} from './user.controller'
import { requestValidate } from '../utils/requestValidate'
import { AdminValidation } from '../admin/admin.validation'
import { facultyValidation } from '../academicFaculty/faculty.validation'
import { studentSchemaValidation } from '../student/student.validation'

export const UserRoutes = express.Router()

UserRoutes.post(
  '/create-student',
  requestValidate(studentSchemaValidation),
  CreateStudent,
)

UserRoutes.post(
  '/create-faculty',
  requestValidate(facultyValidation),
  CreateFaculty,
)

UserRoutes.post(
  '/create-admin',
  requestValidate(AdminValidation),
  CreateAdminUser,
)
