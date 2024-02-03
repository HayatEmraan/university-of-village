import mongoose from 'mongoose'

export const handleCastError = (error: mongoose.Error.CastError) => {
  return [
    {
      path: error.path,
      message: error.message,
    },
  ]
}
