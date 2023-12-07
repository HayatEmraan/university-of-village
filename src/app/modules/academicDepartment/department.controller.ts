import { RequestHandler } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { globalResponseHandler } from '../utils/globalResponseHandler'
import {
  createDepartmentIntoDb,
  getDepartmentFromDb,
  getDepartmentsFromDb,
  updateDepartmentIntoDb,
} from './department.service'

const createDepartment: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 201,
    success: true,
    message: 'Academic department created successfully',
    data: await createDepartmentIntoDb(req.body),
  })
}

const getDepartments: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Academic departments retrieved successfully',
    data: await getDepartmentsFromDb(),
  })
}

const updateDepartment: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Academic department updated successfully',
    data: await updateDepartmentIntoDb(req.params.id, req.body),
  })
}

const getDepartment: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Academic department retrieved successfully',
    data: await getDepartmentFromDb(req.params.id),
  })
}

export const departmentCreate = catchAsync(createDepartment)
export const departmentGet = catchAsync(getDepartments)
export const departmentUpdate = catchAsync(updateDepartment)
export const departmentGetOne = catchAsync(getDepartment)
