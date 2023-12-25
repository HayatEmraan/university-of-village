import { Request, RequestHandler, Response } from 'express'
import { CreateAdmin, CreateFacultyUR, CreateStudentUR, changeStatusById, getMeById } from './user.service'
import { globalResponseHandler } from '../utils/globalResponseHandler'
import { catchAsync } from '../utils/catchAsync'

export const CreateStudent = catchAsync(async (req: Request, res: Response) => {
  const { password = '', student } = req.body
  const result = await CreateStudentUR(password, student)

  await globalResponseHandler(res, {
    status: 201,
    success: true,
    message: 'Student created successfully',
    data: result,
  })
})

export const CreateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { password = '', faculty } = req.body
  const result = await CreateFacultyUR(password, faculty)
  return res.status(201).json({
    status: 201,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  })
})

export const CreateAdminUser: RequestHandler = catchAsync(async (req, res) => {
  const { password = '', admin } = req.body
  const result = await CreateAdmin(password, admin)
  return globalResponseHandler(res, {
    status: 201,
    success: true,
    message: 'Admin created successfully',
    data: result,
  })
})

export const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'User retrieved successfully',
    data: await getMeById(userId, role),
  })
})


export const changeStatus = catchAsync(async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'User status changed successfully',
    data: await changeStatusById(req.params.id, req.body),
  })
})