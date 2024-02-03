import { JWT_ACCESS_TOKEN } from './../../config/index'
import { NextFunction, Request, Response } from 'express'
import { catchAsync } from './catchAsync'
import AppError from '../../errors/appError'
import { JwtPayload } from 'jsonwebtoken'
import { TAuthOptions } from '../../interface/auth.options'
import { userModel } from '../user/user.schema'
import { verifyAuth } from './verifyAuth'

export const auth = (...roles: TAuthOptions[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(401, 'Not authorized')
    }
    const verifyUser = await verifyAuth(token, JWT_ACCESS_TOKEN as string)

    const { userId, role, iat } = verifyUser

    const user = await userModel.isUserExit(userId)
    if (user?.lastPasswordChangedAt) {
      await userModel.isTokenALive(
        iat as number,
        user?.lastPasswordChangedAt as Date,
      )
    }
    const roleIncludes = roles.includes(role)
    if (!roleIncludes) {
      throw new AppError(403, 'Not authorized')
    }
    req.user = verifyUser as JwtPayload
    next()
  })
}
