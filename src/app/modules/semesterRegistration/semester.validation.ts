import { z } from 'zod'

export const SemesterRegistrationValidation = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(['UPCOMING', 'ONGOING', 'COMPLETED']),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredits: z.number(),
    maxCredits: z.number(),
  }),
})

export const UpdateSemesterRegistrationValidation = z
  .object({
    body: z
      .object({
        academicSemester: z.string(),
        status: z.enum(['UPCOMING', 'ONGOING', 'COMPLETED']),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        minCredits: z.number(),
        maxCredits: z.number(),
      })
      .partial(),
  })
  .partial()
