/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import { ZodError } from 'zod'
import { handleZodError } from '../errors/handleZodError'
import { NODE_ENV } from '../config'
import { handleValidationError } from '../errors/handleValidationError'
import { handleCastError } from '../errors/handleCastError'
import { handleDuplicateError } from '../errors/handleDuplicateError'
import AppError from '../errors/appError'
import { JsonWebTokenError } from 'jsonwebtoken'

export const globalErrorHandler: ErrorRequestHandler = async (
  error,
  req,
  res,
  next,
) => {
  let message = error.message || 'Something went wrong'
  let errStack = error
  let status

  if (error instanceof ZodError) {
    const err = handleZodError(error)
    message = err.message
    errStack = err.error
  } else if (error instanceof mongoose.Error.CastError) {
    message = 'Invalid _id'
    errStack = handleCastError(error)
  } else if (error instanceof mongoose.Error.ValidationError) {
    message = 'Validation Error'
    errStack = handleValidationError(error)
  } else if (error.code === 11000) {
    message = 'Duplicate value entered'
    errStack = handleDuplicateError(error)
  } else if (error instanceof AppError) {
    message = error.message
    errStack = error
  } else if (error instanceof JsonWebTokenError) {
    errStack = error
    status = 401
  }

  return res.status(error.statusCode || status || 500).json({
    success: false,
    message: message,
    error: errStack,
    stack: NODE_ENV === 'development' ? error.stack : undefined,
  })
}
