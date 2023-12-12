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
