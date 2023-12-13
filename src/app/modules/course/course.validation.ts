import { z } from 'zod'

export const CourseValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    }),
    prefix: z.string({
      required_error: 'prefix is required',
      invalid_type_error: 'prefix must be a string',
    }),
    code: z.number({
      required_error: 'code is required',
      invalid_type_error: 'code must be a number',
    }),
    credits: z.number({
      required_error: 'credits is required',
      invalid_type_error: 'credits must be a number',
    }),
    preRequisiteCourses: z
      .array(
        z.object({
          course: z.string({
            required_error: 'course is required',
            invalid_type_error: 'course must be a string',
          }),
          isDeleted: z.boolean().default(false),
        }),
      )
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),

})

export const CourseUpdateValidation = CourseValidation.deepPartial()
