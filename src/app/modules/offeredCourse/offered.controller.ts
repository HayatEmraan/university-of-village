import { RequestHandler } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { globalResponseHandler } from '../utils/globalResponseHandler'
import { OfferedCourseService } from './offered.service'

const createOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseHandler(res, {
    status: 201,
    success: true,
    message: 'Offered Course created successfully',
    data: await OfferedCourseService.createOfferedCourse(req.body),
  })
})

const getAllOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Offered Course retrieved successfully',
    data: await OfferedCourseService.getAllOfferedCourse(req.query),
  })
})

const getOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Offered Course retrieved successfully',
    data: await OfferedCourseService.getOfferedCourse(req.params.id),
  })
})

const updateOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Offered Course updated successfully',
    data: await OfferedCourseService.updateOfferedCourse(
      req.params.id,
      req.body,
    ),
  })
})

const deleteOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Offered Course deleted successfully',
    data: await OfferedCourseService.deleteOfferedCourse(req.params.id),
  })
})

export const OfferedController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
}
