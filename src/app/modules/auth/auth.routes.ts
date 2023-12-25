import { Router } from 'express'
import { requestValidate } from '../utils/requestValidate'
import {
  changePasswordValidation,
  forgetPasswordValidation,
  loginValidation,
  refreshTokenValidation,
  resetLinkValidation,
} from './auth.validation'
import { AuthController } from './auth.controller'
import { auth } from '../utils/auth'
import { authOptions } from '../../interface/auth.options'

export const AuthRoutes = Router()

AuthRoutes.post(
  '/login',
  requestValidate(loginValidation),
  AuthController.loginUser,
)

AuthRoutes.post(
  '/change-password',
  auth(authOptions.admin, authOptions.faculty, authOptions.student),
  requestValidate(changePasswordValidation),
  AuthController.changePassword,
)

AuthRoutes.post(
  '/refresh-token',
  requestValidate(refreshTokenValidation),
  AuthController.refreshToken,
)

AuthRoutes.post(
  '/reset-link',
  requestValidate(resetLinkValidation),
  AuthController.resetLink,
)

AuthRoutes.post(
  '/reset-password',
  requestValidate(forgetPasswordValidation),
  AuthController.forgetPassword,
)
