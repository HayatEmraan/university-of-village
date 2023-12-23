import { JWT_ACCESS_TOKEN } from '../../config'
import AppError from '../../errors/appError'
import { userModel } from '../user/user.schema'
import { TUserLogin } from './auth.type'
import jwt from 'jsonwebtoken'

const loginUser = async (payload: TUserLogin) => {
  const user = await userModel.isUserExit(payload?.id)

  if (user) {
    const isPasswordMatch = await userModel.isPasswordMatch(
      payload?.password,
      user.password,
    )
    if (!isPasswordMatch) {
      throw new AppError(403, 'Password not match')
    }
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  }

  const accessToken = await jwt.sign(jwtPayload, JWT_ACCESS_TOKEN as string, {
    expiresIn: '1d',
  })

  return {
    accessToken,
    needPasswordChange: user?.needsPasswordChange,
  }
}

const refreshToken = async (payload: string) => {}

export const AuthService = {
  loginUser,
  refreshToken,
}
