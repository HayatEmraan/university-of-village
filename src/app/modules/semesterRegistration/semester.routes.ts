import { Router } from 'express'
import { requestValidate } from '../utils/requestValidate'
import {
  SemesterRegistrationValidation,
  UpdateSemesterRegistrationValidation,
} from './semester.validation'
import { SemesterRegistrationController } from './semester.controller'

export const SemesterRegistrationRoutes = Router()

SemesterRegistrationRoutes.post(
  '/create-semester-registration',
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
  requestValidate(UpdateSemesterRegistrationValidation),
  SemesterRegistrationController.updateSemesterRegistration,
)
