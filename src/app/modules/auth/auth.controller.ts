import { RequestHandler } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { globalResponseHandler } from '../utils/globalResponseHandler'
import { AuthService } from './auth.service'

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, needPasswordChange } =
    await AuthService.loginUser(req.body)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: false,
    maxAge: 60 * 60 * 1000,
  })
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
      needPasswordChange,
    },
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
  const { refreshToken } = req.cookies
  const accessToken = await AuthService.refreshToken(refreshToken)
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: false,
    maxAge: 60 * 60 * 1000,
  })
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'User logged in successfully',
    data: accessToken,
  })
})

const resetLink = catchAsync(async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Password reset link sent successfully',
    data: await AuthService.resetLink(req.body),
  })
})

const forgetPassword = catchAsync(async (req, res) => {
  const token = req.headers?.authorization as string
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Password reset successfully',
    data: await AuthService.forgetPassword(token, req.body),
  })
})

export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetLink,
}
