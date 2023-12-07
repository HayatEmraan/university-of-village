import { z } from 'zod'

export const facultyValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
      })
      .min(3),
  }),
})
