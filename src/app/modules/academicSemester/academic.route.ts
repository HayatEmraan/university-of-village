import { Router } from 'express'
import {
  createSemester,
  getSemesters,
  getSingleSemester,
  updateSemester,
} from './academic.controller'
import { requestValidate } from '../utils/requestValidate'
import {
  AcademicSemesterValidation,
  UpdateAcademicSemesterValidation,
} from './academic.validate'

export const AcademicRoutes = Router()

AcademicRoutes.post(
  '/create-semester',
  requestValidate(AcademicSemesterValidation),
  createSemester,
)

AcademicRoutes.get('/', getSemesters)

AcademicRoutes.get('/:id', getSingleSemester)

AcademicRoutes.patch(
  '/:id',
  requestValidate(UpdateAcademicSemesterValidation),
  updateSemester,
)
