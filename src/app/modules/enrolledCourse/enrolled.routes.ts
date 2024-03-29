import { Router } from 'express'
import { EnrolledController } from './enrolled.controller'
import { requestValidate } from '../utils/requestValidate'
import {
  enrolledUpdateValidation,
  enrolledValidation,
} from './enrolled.validation'
import { auth } from '../utils/auth'
import { authOptions } from '../../interface/auth.options'

export const EnrolledRoutes = Router()

EnrolledRoutes.post(
  '/enroll-course',
  auth(authOptions.student),
  requestValidate(enrolledValidation),
  EnrolledController.EnrolledCourse,
)

EnrolledRoutes.patch(
  '/update-enroll-course',
  auth(authOptions.faculty, authOptions.admin, authOptions.superAdmin),
  requestValidate(enrolledUpdateValidation),
  EnrolledController.EnrolledCourseUpdate,
)

EnrolledRoutes.get(
  '/my-enrolled-courses',
  auth(authOptions.student),
  EnrolledController.getMyEnrolledCourse,
)
