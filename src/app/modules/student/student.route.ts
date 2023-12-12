import { Router } from 'express'
import { requestValidate } from '../utils/requestValidate'
import { updateStudentSchemaValidation } from './student.validation'
import {
  studentDelete,
  studentGet,
  studentUpdate,
  studentsGet,
} from './student.controller'

export const StudentRoutes = Router()

StudentRoutes.get('/', studentsGet)

StudentRoutes.get('/:id', studentGet)

StudentRoutes.patch(
  '/:id',
  requestValidate(updateStudentSchemaValidation),
  studentUpdate,
)

StudentRoutes.delete('/:id', studentDelete)
