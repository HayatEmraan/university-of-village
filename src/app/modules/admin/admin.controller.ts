import { RequestHandler } from 'express'
import { globalResponseHandler } from '../utils/globalResponseHandler'
import { catchAsync } from '../utils/catchAsync'
import {
  handleDeleteAdmin,
  handleGetAdmin,
  handleGetAdmins,
  handleUpdateAdmin,
} from './admin.service'

const getAdmins: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Admins retrieved successfully',
    data: await handleGetAdmins(),
  })
}

const getAdmin: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Admin retrieved successfully',
    data: await handleGetAdmin(req.params.id),
  })
}

const updateAdmin: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Admin updated successfully',
    data: await handleUpdateAdmin(req.params.id, req.body),
  })
}

const deleteAdmin: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Admin deleted successfully',
    data: await handleDeleteAdmin(req.params.id),
  })
}

export const AdminsGet = catchAsync(getAdmins)
export const AdminGet = catchAsync(getAdmin)
export const AdminUpdate = catchAsync(updateAdmin)
export const AdminDelete = catchAsync(deleteAdmin)
