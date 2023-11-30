import { NextFunction, Request, Response } from 'express'
import { CreateStudentUR } from './user.service'
import { globalResponseHandler } from '../utils/globalResponseHandler'

export const CreateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password = '', student } = req.body
    const result = await CreateStudentUR(password, student)

    await globalResponseHandler(res, {
      status: 201,
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (error: any) {
    next(error)
  }
}
