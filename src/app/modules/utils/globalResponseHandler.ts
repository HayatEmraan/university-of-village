import { Response } from 'express'

interface TResponse<T> {
  status: number
  success: boolean
  message: string
  data: T
  meta?: Record<string, unknown>
}

export const globalResponseHandler = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data.status).send({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  })
}
