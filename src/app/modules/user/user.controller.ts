import { Request, Response } from 'express'
import { CreateFacultyUR, CreateStudentUR } from './user.service'
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
