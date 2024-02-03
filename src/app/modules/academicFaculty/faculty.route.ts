import { Router } from 'express'
import { requestValidate } from '../utils/requestValidate'
import { facultyValidation } from './faculty.validation'
import {
  AcademicFaculties,
  createFaculty,
  getSingleAcademicFAculty,
  updateSingleFaculty,
} from './faculty.controller'
import { auth } from '../utils/auth'
import { authOptions } from '../../interface/auth.options'

export const FacultyRoutes = Router()

FacultyRoutes.post(
  '/create-academic-faculty',
  auth(authOptions.admin, authOptions.superAdmin),
  requestValidate(facultyValidation),
  createFaculty,
)

FacultyRoutes.get('/get-academic-faculties', AcademicFaculties)

FacultyRoutes.get('/get-academic-faculty/:id', getSingleAcademicFAculty)

FacultyRoutes.patch(
  '/update-academic-faculty/:id',
  requestValidate(facultyValidation),
  updateSingleFaculty,
)
