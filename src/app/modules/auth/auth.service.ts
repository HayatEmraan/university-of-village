import { JWT_ACCESS_TOKEN, bcryptSaltRounds } from '../../config'
import AppError from '../../errors/appError'
import { userModel } from '../user/user.schema'
import { TUserLogin } from './auth.type'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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

const changePassword = async (
  id: string,
  payload: {
    oldPassword: string
    password: string
  },
) => {
  const user = await userModel.isUserExit(id)

  if (user) {
    const isPasswordMatch = await userModel.isPasswordMatch(
      payload?.oldPassword,
      user.password,
    )
    if (!isPasswordMatch) {
      throw new AppError(403, 'Password not match')
    }
  }

  const cryptoPassword = await bcrypt.hash(
    payload?.password,
    Number(bcryptSaltRounds),
  )

  await userModel.findOneAndUpdate(
    { id },
    {
      password: cryptoPassword,
      needsPasswordChange: false,
      lastPasswordChangedAt: new Date(),
    },
  )
  return true
}

const refreshToken = async (payload: string) => {
  return payload
}

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
}
