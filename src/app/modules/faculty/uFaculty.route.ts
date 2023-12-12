import { Router } from 'express'
import {
  uFacultiesGet,
  uFacultyDelete,
  uFacultyGet,
  uFacultyUpdate,
} from './uFaculty.controller'
import { requestValidate } from '../utils/requestValidate'
import { updateUFacultyValidation } from './uFaculty.validation'

export const UFacultyRoutes = Router()

UFacultyRoutes.get('/', uFacultiesGet)

UFacultyRoutes.get('/:id', uFacultyGet)

UFacultyRoutes.patch(
  '/:id',
  requestValidate(updateUFacultyValidation),
  uFacultyUpdate,
)

UFacultyRoutes.delete('/:id', uFacultyDelete)
