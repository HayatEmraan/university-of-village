import express, { NextFunction, Request, Response } from 'express'
import {
  CreateAdminUser,
  CreateFaculty,
  CreateStudent,
  changeStatus,
  getMe,
} from './user.controller'
import { requestValidate } from '../utils/requestValidate'
import { AdminValidation } from '../admin/admin.validation'
import { facultyValidation } from '../academicFaculty/faculty.validation'
import { studentSchemaValidation } from '../student/student.validation'
import { auth } from '../utils/auth'
import { authOptions } from '../../interface/auth.options'
import { changeStatusValidation } from './user.validation'
import { upload } from '../utils/uploadImage'

export const UserRoutes = express.Router()

UserRoutes.post(
  '/create-student',
  auth(authOptions.admin),
  upload.single('profileImage'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  requestValidate(studentSchemaValidation),
  CreateStudent,
)

UserRoutes.post(
  '/create-faculty',
  auth(authOptions.admin),
  upload.single('profileImage'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  requestValidate(facultyValidation),
  CreateFaculty,
)

UserRoutes.post(
  '/create-admin',
  auth(authOptions.admin),
  upload.single('profileImage'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  requestValidate(AdminValidation),
  CreateAdminUser,
)

UserRoutes.get(
  '/me',
  auth(authOptions.admin, authOptions.student, authOptions.faculty),
  getMe,
)

UserRoutes.post(
  '/change-status/:id',
  auth(authOptions.admin),
  requestValidate(changeStatusValidation),
  changeStatus,
)
