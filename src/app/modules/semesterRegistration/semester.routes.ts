import { Router } from 'express'
import { requestValidate } from '../utils/requestValidate'
import {
  SemesterRegistrationValidation,
  UpdateSemesterRegistrationValidation,
} from './semester.validation'
import { SemesterRegistrationController } from './semester.controller'
import { auth } from '../utils/auth'
import { authOptions } from '../../interface/auth.options'

export const SemesterRegistrationRoutes = Router()

SemesterRegistrationRoutes.post(
  '/create-semester-registration',
  auth(authOptions.admin, authOptions.superAdmin),
  requestValidate(SemesterRegistrationValidation),
  SemesterRegistrationController.semesterRegistrationCreate,
)

SemesterRegistrationRoutes.get(
  '/get-all-semester-registration',
  SemesterRegistrationController.getAllSemesterRegistration,
)

SemesterRegistrationRoutes.get(
  '/get-semester-registration/:id',
  SemesterRegistrationController.getSemesterRegistration,
)

SemesterRegistrationRoutes.patch(
  '/update-semester-registration/:id',
  auth(authOptions.admin, authOptions.superAdmin),
  requestValidate(UpdateSemesterRegistrationValidation),
  SemesterRegistrationController.updateSemesterRegistration,
)

SemesterRegistrationRoutes.delete(
  '/delete-semester-registration/:id',
  auth(authOptions.admin, authOptions.superAdmin),
  SemesterRegistrationController.deleteSemesterRegistration,
)
