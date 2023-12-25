import { Router } from 'express'
import { requestValidate } from '../utils/requestValidate'
import { updateStudentSchemaValidation } from './student.validation'
import {
  studentDelete,
  studentGet,
  studentUpdate,
  studentsGet,
} from './student.controller'
import { auth } from '../utils/auth'
import { authOptions } from '../../interface/auth.options'

export const StudentRoutes = Router()

StudentRoutes.get('/', auth(authOptions.admin), studentsGet)

StudentRoutes.get('/:id', auth(authOptions.admin, authOptions.faculty), studentGet)

StudentRoutes.patch(
  '/:id',
  requestValidate(updateStudentSchemaValidation),
  studentUpdate,
)

StudentRoutes.delete('/:id', studentDelete)
