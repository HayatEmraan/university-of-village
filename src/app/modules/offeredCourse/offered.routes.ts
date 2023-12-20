import { Router } from 'express'
import { OfferedController } from './offered.controller'
import { requestValidate } from '../utils/requestValidate'
import {
  OfferedValidation,
  UpdateOfferedValidation,
} from './offered.validation'

export const OfferedRoutes = Router()

OfferedRoutes.post(
  '/create-offered-course',
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
  requestValidate(UpdateOfferedValidation),
  OfferedController.updateOfferedCourse,
)
