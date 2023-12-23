import { z } from 'zod'

export const loginValidation = z.object({
  body: z.object({
    id: z.string().min(1, 'ID is required'),
    password: z.string().min(1, 'Password is required'),
  }),
})

export const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string().min(1, 'Old Password is required'),
    password: z.string().min(1, 'Password is required'),
  }),
})

export const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string().min(1, 'Refresh Token is required'),
  }),
})
