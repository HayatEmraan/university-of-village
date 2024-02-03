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

UFacultyRoutes.get('/', auth(authOptions.admin), uFacultiesGet)

UFacultyRoutes.get('/:id', uFacultyGet)

UFacultyRoutes.patch(
  '/:id',
  requestValidate(updateUFacultyValidation),
  uFacultyUpdate,
)

UFacultyRoutes.delete('/:id', uFacultyDelete)
