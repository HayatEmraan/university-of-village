import { Router } from 'express'
import { requestValidate } from '../utils/requestValidate'
import { facultyValidation } from './faculty.validation'
import {
  AcademicFaculties,
  createFaculty,
  getSingleAcademicFAculty,
  updateSingleFaculty,
} from './faculty.controller'

export const FacultyRoutes = Router()

FacultyRoutes.post(
  '/create-faculty',
  requestValidate(facultyValidation),
  createFaculty,
)

FacultyRoutes.get('/get-faculties', AcademicFaculties)

FacultyRoutes.get('/get-faculty/:id', getSingleAcademicFAculty)

FacultyRoutes.patch(
  '/update-faculty/:id',
  requestValidate(facultyValidation),
  updateSingleFaculty,
)
