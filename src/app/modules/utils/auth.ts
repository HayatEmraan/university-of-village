import { JWT_ACCESS_TOKEN } from './../../config/index'
import { NextFunction, Request, Response } from 'express'
import { catchAsync } from './catchAsync'
import AppError from '../../errors/appError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { TAuthOptions } from '../../interface/auth.options'

export const auth = (...roles: TAuthOptions[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(401, 'Not authorized')
    }
    const verifyUser = await jwt.verify(token, JWT_ACCESS_TOKEN as string)
    const roleIncludes = roles.includes((verifyUser as JwtPayload).role)
    if (!roleIncludes) {
      throw new AppError(403, 'Not authorized')
    }
    req.user = verifyUser as JwtPayload
    next()
  })
}
