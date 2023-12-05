import { z } from 'zod'
import { AcademicCode, Months, TAcademicName } from './academic.const'
import { TSemesterNameAndCode } from './academic.interface'

export const AcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum(TAcademicName as [string, ...string[]]),
    year: z.string({
      required_error: 'year is required',
      invalid_type_error: 'year must be a string',
    }),
    code: z.enum(AcademicCode as [string, ...string[]]),
    startMonth: z.enum(Months as [string, ...string[]]),
    endMonth: z.enum(Months as [string, ...string[]]),
  }),
})

export const UpdateAcademicSemesterValidation = z
  .object({
    body: z.object({
      name: z.enum(TAcademicName as [string, ...string[]]),
      year: z.string({
        required_error: 'year is required',
        invalid_type_error: 'year must be a string',
      }),
      code: z.enum(AcademicCode as [string, ...string[]]),
      startMonth: z.enum(Months as [string, ...string[]]),
      endMonth: z.enum(Months as [string, ...string[]]),
    }).partial(),
  })
  .partial()

export const SemesterValidate: TSemesterNameAndCode = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
