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
CourseRoutes.put(
  '/:id/assign-faculties',
  requestValidate(CourseFacultiesValidation),
  AssignCourseToFacultiesIntoDb,
)

CourseRoutes.delete(
  '/:id/remove-faculties',
  requestValidate(CourseFacultiesValidation),
  RemoveCourseToFacultiesIntoDb,
)

CourseRoutes.delete('/:id', DeleteCourseFromDb)
