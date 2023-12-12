import { z } from 'zod'

export const AdminValidation = z.object({
  body: z.object({
    admin: z.object({
      id: z.string({
        required_error: 'id is required',
        invalid_type_error: 'id must be a string',
      }),
      user: z.string({
        required_error: 'user is required',
        invalid_type_error: 'user must be a string',
      }),
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
      dateOfBirth: z.date(),
      email: z.string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string',
      }),
      contactNo: z.string({
        required_error: 'contactNo is required',
        invalid_type_error: 'contactNo must be a string',
      }),
      emergencyNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      designation: z.string(),
      managementDepartment: z.string(),
      profileImage: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
})

export const UpdateAdminValidation = AdminValidation.deepPartial()
