import { z } from 'zod'

export const enrolledValidation = z.object({
  body: z.object({
    offeredCourse: z.string().min(1, 'Offered Course is required'),
  }),
})

export const enrolledUpdateValidation = z.object({
  body: z
    .object({
      semesterRegistration: z
        .string()
        .min(1, 'Semester Registration is required'),
      offeredCourse: z.string().min(1, 'Offered Course is required'),
      student: z.string().min(1, 'Student is required'),
      courseMarks: z.object({
        classTest1: z.number().optional(),
        midTerm: z.number().optional(),
        classTest2: z.number().optional(),
        finalTerm: z.number().optional(),
      }),
    })
    .partial(),
})
