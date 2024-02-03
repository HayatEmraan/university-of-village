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
import { auth } from '../utils/auth'
import { authOptions } from '../../interface/auth.options'

export const DepartmentRoutes = Router()

DepartmentRoutes.post(
  '/create-academic-department',
  auth(authOptions.admin, authOptions.superAdmin),
  requestValidate(departmentValidation),
  departmentCreate,
)

DepartmentRoutes.get('/get-academic-departments', departmentGet)

DepartmentRoutes.get('/get-academic-department/:id', departmentGetOne)

DepartmentRoutes.patch(
  '/update-academic-department/:id',
  auth(authOptions.admin, authOptions.superAdmin),
  requestValidate(updateDepartmentValidation),
  departmentUpdate,
)
