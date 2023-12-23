import { Router } from 'express'
import { requestValidate } from '../utils/requestValidate'
import { loginValidation } from './auth.validation'
import { AuthController } from './auth.controller'

export const AuthRoutes = Router()

AuthRoutes.post(
  '/login',
  requestValidate(loginValidation),
  AuthController.loginUser,
)

AuthRoutes.get('/refresh-token', AuthController.refreshToken)
