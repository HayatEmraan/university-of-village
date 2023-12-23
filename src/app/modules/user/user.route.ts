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
import { auth } from '../utils/auth'
import { authOptions } from '../../interface/auth.options'

export const UserRoutes = express.Router()

UserRoutes.post(
  '/create-student',
  auth(authOptions.admin),
  requestValidate(studentSchemaValidation),
  CreateStudent,
)

UserRoutes.post(
  '/create-faculty',
  auth(authOptions.admin),
  requestValidate(facultyValidation),
  CreateFaculty,
)

UserRoutes.post(
  '/create-admin',
  auth(authOptions.admin),
  requestValidate(AdminValidation),
  CreateAdminUser,
)
