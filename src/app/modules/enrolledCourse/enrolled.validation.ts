import { z } from 'zod'

export const enrolledValidation = z.object({
  body: z.object({
    offeredCourse: z.string().min(1, 'Offered Course is required'),
  }),
})
