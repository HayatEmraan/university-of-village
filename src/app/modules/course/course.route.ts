import { Router } from 'express'
import {
  CreateCourseIntoDb,
  DeleteCourseFromDb,
  GetCourseFromDb,
  GetCoursesFromDb,
  UpdateCourseIntoDb,
} from './course.controller'
import { requestValidate } from '../utils/requestValidate'
import { CourseUpdateValidation, CourseValidation } from './course.validation'

export const CourseRoutes = Router()

CourseRoutes.post(
  '/create-course',
  requestValidate(CourseValidation),
  CreateCourseIntoDb,
)
CourseRoutes.get('/', GetCoursesFromDb)
CourseRoutes.get('/:id', GetCourseFromDb)
CourseRoutes.patch(
  '/:id',
  requestValidate(CourseUpdateValidation),
  UpdateCourseIntoDb,
)
CourseRoutes.delete('/:id', DeleteCourseFromDb)
