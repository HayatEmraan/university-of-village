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

export const EnrolledController = {
  EnrolledCourse,
}
