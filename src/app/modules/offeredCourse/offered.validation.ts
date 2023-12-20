import { z } from 'zod'

export const OfferedValidation = z.object({
  body: z.object({
    semesterRegistration: z.string({
      required_error: 'Semester Registration is required',
      invalid_type_error: 'Semester Registration must be a string',
    }),
    course: z.string({
      required_error: 'Course is required',
      invalid_type_error: 'Course must be a string',
    }),
    startTime: z.string({
      required_error: 'Start Time is required',
      invalid_type_error: 'Start Time must be a string',
    }),
    endTime: z.string({
      required_error: 'End Time is required',
      invalid_type_error: 'End Time must be a string',
    }),
    section: z.number({
      required_error: 'Section is required',
      invalid_type_error: 'Section must be a number',
    }),
    days: z.array(z.enum(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'])),
    maxCapacity: z.number({
      required_error: 'Max Capacity is required',
      invalid_type_error: 'Max Capacity must be a number',
    }),
    faculty: z.string({
      required_error: 'Faculty is required',
      invalid_type_error: 'Faculty must be a string',
    }),
    academicDepartment: z.string({
      required_error: 'Academic Department is required',
      invalid_type_error: 'Academic Department must be a string',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required',
      invalid_type_error: 'Academic faculty must be a string',
    }),
  }),
})

export const UpdateOfferedValidation = z.object({
  body: z
    .object({
      startTime: z.string({
        required_error: 'Start Time is required',
        invalid_type_error: 'Start Time must be a string',
      }),
      endTime: z.string({
        required_error: 'End Time is required',
        invalid_type_error: 'End Time must be a string',
      }),
      section: z.number({
        required_error: 'Section is required',
        invalid_type_error: 'Section must be a number',
      }),
      days: z.array(z.enum(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'])),
      maxCapacity: z.number({
        required_error: 'Max Capacity is required',
        invalid_type_error: 'Max Capacity must be a number',
      }),
      faculty: z.string({
        required_error: 'Faculty is required',
        invalid_type_error: 'Faculty must be a string',
      }),
    })
    .partial(),
})
