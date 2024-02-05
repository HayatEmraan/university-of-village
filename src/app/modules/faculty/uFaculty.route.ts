import { Router } from 'express'
import {
  uFacultiesGet,
  uFacultyDelete,
  uFacultyGet,
  uFacultyUpdate,
} from './uFaculty.controller'
import { requestValidate } from '../utils/requestValidate'
import { updateUFacultyValidation } from './uFaculty.validation'
import { auth } from '../utils/auth'
import { authOptions } from '../../interface/auth.options'

export const UFacultyRoutes = Router()

UFacultyRoutes.get(
  '/',
  auth(authOptions.admin, authOptions.superAdmin),
  uFacultiesGet,
)

UFacultyRoutes.get(
  '/:id',
  auth(authOptions.admin, authOptions.superAdmin, authOptions.faculty),
  uFacultyGet,
)

UFacultyRoutes.patch(
  '/:id',
  auth(authOptions.admin, authOptions.superAdmin),
  requestValidate(updateUFacultyValidation),
  uFacultyUpdate,
)

UFacultyRoutes.delete(
  '/:id',
  auth(authOptions.admin, authOptions.superAdmin),
  uFacultyDelete,
)
