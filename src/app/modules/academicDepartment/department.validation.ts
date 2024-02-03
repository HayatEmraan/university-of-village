import { z } from 'zod'

export const departmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
      })
      .min(3),
    academicFaculty: z.string({
      required_error: 'academicFaculty is required',
      invalid_type_error: 'academicFaculty must be a string',
    }),
  }),
})

export const updateDepartmentValidation = z
  .object({
    body: z.object({
      name: z
        .string({
          required_error: 'name is required',
          invalid_type_error: 'name must be a string',
        })
        .min(3),
      academicFaculty: z.string({
        required_error: 'academicFaculty is required',
        invalid_type_error: 'academicFaculty must be a string',
      }),
    }),
  })
  .deepPartial()
