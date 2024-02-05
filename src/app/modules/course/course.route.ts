import { Router } from 'express'
import {
  AssignCourseToFacultiesIntoDb,
  CreateCourseIntoDb,
  DeleteCourseFromDb,
  GetCourseFromDb,
  GetCoursesFromDb,
  RemoveCourseToFacultiesIntoDb,
  UpdateCourseIntoDb,
} from './course.controller'
import { requestValidate } from '../utils/requestValidate'
import {
  CourseFacultiesValidation,
  CourseUpdateValidation,
  CourseValidation,
} from './course.validation'
import { auth } from '../utils/auth'
import { authOptions } from '../../interface/auth.options'

export const CourseRoutes = Router()

CourseRoutes.post(
  '/create-course',
  auth(authOptions.admin, authOptions.superAdmin),
  requestValidate(CourseValidation),
  CreateCourseIntoDb,
)
CourseRoutes.get('/', GetCoursesFromDb)
CourseRoutes.get('/:id', GetCourseFromDb)
CourseRoutes.patch(
  '/:id',
  auth(authOptions.admin, authOptions.superAdmin),
  requestValidate(CourseUpdateValidation),
  UpdateCourseIntoDb,
)
CourseRoutes.put(
  '/:id/assign-faculties',
  auth(authOptions.admin, authOptions.superAdmin),
  requestValidate(CourseFacultiesValidation),
  AssignCourseToFacultiesIntoDb,
)

CourseRoutes.delete(
  '/:id/remove-faculties',
  auth(authOptions.admin, authOptions.superAdmin),
  requestValidate(CourseFacultiesValidation),
  RemoveCourseToFacultiesIntoDb,
)

CourseRoutes.delete(
  '/:id',
  auth(authOptions.admin, authOptions.superAdmin),
  DeleteCourseFromDb,
)
