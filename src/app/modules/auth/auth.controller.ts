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

// const accessToken: RequestHandler = catchAsync(async (req, res) => {
//   return globalResponseHandler(res, {
//     status: 200,
//     success: true,
//     message: 'User logged in successfully',
//     data: null,
//   })
// })

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
//   accessToken,
  refreshToken,
}
