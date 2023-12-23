import { z } from 'zod'

export const UFacultyValidation = z.object({
  body: z.object({
    faculty: z.object({
      name: z.object({
        firstName: z
          .string({
            required_error: 'firstName is required',
            invalid_type_error: 'firstName must be a string',
          })
          .min(3),
        middleName: z
          .string({
            required_error: 'middleName is required',
            invalid_type_error: 'middleName must be a string',
          })
          .min(3),
        lastName: z
          .string({
            required_error: 'lastName is required',
            invalid_type_error: 'lastName must be a string',
          })
          .min(3),
      }),
      gender: z.enum(['female', 'male', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string().max(15),
      emergencyContactNo: z.string().max(15),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
      designation: z.string(),
      profileImage: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
})

export const updateUFacultyValidation = UFacultyValidation.deepPartial()
