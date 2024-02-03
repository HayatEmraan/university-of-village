import { z } from 'zod'

export const userSchemaValidation = z.object({
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    })
    .min(8)
    .optional(),
})

export const changeStatusValidation = z.object({
  body: z.object({
    status: z.enum(['active', 'blocked']),
  }),
})
