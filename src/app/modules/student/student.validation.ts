import { z } from 'zod'

const StudentName = z.object({
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
    .min(3)
    .optional(),
  lastName: z
    .string({
      required_error: 'lastName is required',
      invalid_type_error: 'lastName must be a string',
    })
    .min(3),
})

const Guardian = z.object({
  father: z.object({
    fatherName: z
      .string({
        required_error: 'fatherName is required',
        invalid_type_error: 'fatherName must be a string',
      })
      .min(3),
    fatherOccupation: z
      .string({
        required_error: 'fatherOccupation is required',
        invalid_type_error: 'fatherOccupation must be a string',
      })
      .min(3),
    fatherContactNo: z
      .string({
        required_error: 'fatherContactNo is required',
        invalid_type_error: 'fatherContactNo must be a string',
      })
      .min(3),
  }),
  mother: z.object({
    motherName: z
      .string({
        required_error: 'motherName is required',
        invalid_type_error: 'motherName must be a string',
      })
      .min(3),
    motherOccupation: z
      .string({
        required_error: 'motherOccupation is required',
        invalid_type_error: 'motherOccupation must be a string',
      })
      .min(3),
    motherContactNo: z
      .string({
        required_error: 'motherContactNo is required',
        invalid_type_error: 'motherContactNo must be a string',
      })
      .min(3),
  }),
})

const LocalGuardian = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .min(3),
  occupation: z
    .string({
      required_error: 'occupation is required',
      invalid_type_error: 'occupation must be a string',
    })
    .min(3),
  contactNo: z
    .string({
      required_error: 'contactNo is required',
      invalid_type_error: 'contactNo must be a string',
    })
    .min(3),
})

export const studentSchemaValidation = z.object({
  id: z.string(),
  user: z.string(),
  name: StudentName,
  gender: z.enum(['female', 'male', 'other']),
  dateOfBirth: z.date(),
  email: z.string().email(),
  contactNo: z.string().max(15),
  emergencyNo: z.string().max(15),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: Guardian,
  localGuardian: LocalGuardian,
  academicSemester: z.string(),
  profileImage: z.string().optional(),
})

export const updateStudentSchemaValidation =
  studentSchemaValidation.deepPartial()
