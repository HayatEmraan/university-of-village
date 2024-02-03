import { Router } from 'express'
import { requestValidate } from '../utils/requestValidate'
import {
  departmentValidation,
  updateDepartmentValidation,
} from './department.validation'
import {
  departmentCreate,
  departmentGet,
  departmentGetOne,
  departmentUpdate,
} from './department.controller'

export const DepartmentRoutes = Router()

DepartmentRoutes.post(
  '/create-department',
  requestValidate(departmentValidation),
  departmentCreate,
)

DepartmentRoutes.get('/get-departments', departmentGet)

DepartmentRoutes.get('/get-department/:id', departmentGetOne)

DepartmentRoutes.patch(
  '/update-department/:id',
  requestValidate(updateDepartmentValidation),
  departmentUpdate,
)
