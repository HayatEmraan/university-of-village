import { RequestHandler } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { globalResponseHandler } from '../utils/globalResponseHandler'
import { EnrolledCourseService } from './enrolled.service'

const EnrolledCourse: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.user
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Enrolled Course created successfully',
    data: await EnrolledCourseService.createEnrolledCourse(userId, req.body),
  })
})

const EnrolledCourseUpdate: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.user
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Enrolled Course updated successfully',
    data: await EnrolledCourseService.updateEnrolledCourse(userId, req.body),
  })
})

const getMyEnrolledCourse: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.user

  const { data, meta } = await EnrolledCourseService.getMyEnrolledCourseFromDB(
    userId,
    req.query,
  )

  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Enrolled Course retrieved successfully',
    data,
    meta,
  })
})

export const EnrolledController = {
  EnrolledCourse,
  EnrolledCourseUpdate,
  getMyEnrolledCourse,
}
