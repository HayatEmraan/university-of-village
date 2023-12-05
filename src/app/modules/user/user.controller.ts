import { NextFunction, Request, RequestHandler, Response } from 'express'
import { CreateStudentUR } from './user.service'
import { globalResponseHandler } from '../utils/globalResponseHandler'

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err))
  }
}

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