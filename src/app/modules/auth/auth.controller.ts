import { RequestHandler } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { globalResponseHandler } from '../utils/globalResponseHandler'
import { AuthService } from './auth.service'

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'User logged in successfully',
    data: await AuthService.loginUser(req.body),
  })
})

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.user
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Password changed successfully',
    data: await AuthService.changePassword(userId, req.body),
  })
})

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'User logged in successfully',
    data: await AuthService.refreshToken(req.body),
  })
})

export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
}
