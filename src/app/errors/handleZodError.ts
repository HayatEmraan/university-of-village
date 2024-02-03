import { ZodError } from 'zod'

export const handleZodError = (error: ZodError) => {
  const mappedError = error.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    }
  })
  return {
    success: false,
    message: 'Validation error',
    error: mappedError,
  }
}
