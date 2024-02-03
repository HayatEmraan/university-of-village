import { z } from 'zod'

export const AdminValidation = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
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
