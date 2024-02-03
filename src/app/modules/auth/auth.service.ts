import {
  ACCESS_TOKEN_EXPIRES,
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
  JWT_RESET_TOKEN,
  REFRESH_TOKEN_EXPIRES,
  RESET_TOKEN_EXPIRES,
  RESET_UI_LINK,
  bcryptSaltRounds,
} from '../../config'
import AppError from '../../errors/appError'
import { userModel } from '../user/user.schema'
import { TUserLogin } from './auth.type'
import bcrypt from 'bcrypt'
import { createToken } from './auth.utils'
import { sendEmail } from '../utils/sendEmail'
import { verifyAuth } from '../utils/verifyAuth'

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

  const accessToken = createToken(
    jwtPayload,
    JWT_ACCESS_TOKEN as string,
    ACCESS_TOKEN_EXPIRES as string,
  )
  const refreshToken = createToken(
    jwtPayload,
    JWT_REFRESH_TOKEN as string,
    REFRESH_TOKEN_EXPIRES as string,
  )

  return {
    accessToken,
    refreshToken,
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

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(401, 'Not authorized')
  }
  const verifyUser = await verifyAuth(token, JWT_REFRESH_TOKEN as string)

  const { userId, iat } = verifyUser

  const user = await userModel.isUserExit(userId)
  if (user?.lastPasswordChangedAt) {
    await userModel.isTokenALive(
      iat as number,
      user?.lastPasswordChangedAt as Date,
    )
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  }

  const accessToken = createToken(
    jwtPayload,
    JWT_ACCESS_TOKEN as string,
    ACCESS_TOKEN_EXPIRES as string,
  )
  return accessToken
}

const resetLink = async (payload: { id: string }) => {
  const user = await userModel.isUserExit(payload?.id)
  if (!user) {
    throw new AppError(404, 'User not found')
  }
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  }
  const token = createToken(
    jwtPayload,
    JWT_RESET_TOKEN as string,
    RESET_TOKEN_EXPIRES as string,
  )
  const resetLink = `${RESET_UI_LINK}/reset-password/?id=${user?.id}&token=${token}`
  await sendEmail(user?.email, resetLink)
}

const forgetPassword = async (
  token: string,
  payload: { id: string; password: string },
) => {
  const { userId: id } = await verifyAuth(token, JWT_RESET_TOKEN as string)

  const user = await userModel.isUserExit(payload?.id)
  if (!user) {
    throw new AppError(404, 'User not found')
  }
  if (id !== payload?.id) {
    throw new AppError(403, 'Invalid request')
  } else if (id !== user?.id) {
    throw new AppError(403, 'Invalid request')
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

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  resetLink,
  forgetPassword,
}
