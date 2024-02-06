import { Router } from 'express'
import { OfferedController } from './offered.controller'
import { requestValidate } from '../utils/requestValidate'
import {
  OfferedValidation,
  UpdateOfferedValidation,
} from './offered.validation'
import { auth } from '../utils/auth'
import { authOptions } from '../../interface/auth.options'

export const OfferedRoutes = Router()

OfferedRoutes.post(
  '/create-offered-course',
  auth(authOptions.admin, authOptions.superAdmin),
  requestValidate(OfferedValidation),
  OfferedController.createOfferedCourse,
)

OfferedRoutes.get(
  '/get-all-offered-course',
  OfferedController.getAllOfferedCourse,
)

OfferedRoutes.get('/get-offered-course/:id', OfferedController.getOfferedCourse)

OfferedRoutes.patch(
  '/update-offered-course/:id',
  auth(authOptions.admin, authOptions.superAdmin),
  requestValidate(UpdateOfferedValidation),
  OfferedController.updateOfferedCourse,
)

OfferedRoutes.delete(
  '/delete-offered-course/:id',
  auth(authOptions.admin, authOptions.superAdmin),
  OfferedController.deleteOfferedCourse,
)
