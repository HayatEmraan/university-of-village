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
import { auth } from '../utils/auth'
import { authOptions } from '../../interface/auth.options'

export const AcademicRoutes = Router()

AcademicRoutes.post(
  '/create-semester',
  requestValidate(AcademicSemesterValidation),
  createSemester,
)

AcademicRoutes.get('/', auth(authOptions.admin), getSemesters)

AcademicRoutes.get('/:id', getSingleSemester)

AcademicRoutes.patch(
  '/:id',
  requestValidate(UpdateAcademicSemesterValidation),
  updateSemester,
)
