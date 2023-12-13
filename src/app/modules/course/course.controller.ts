import { RequestHandler } from 'express'
import { globalResponseHandler } from '../utils/globalResponseHandler'
import {
  CreateCourse,
  DeleteCourse,
  GetCourse,
  GetCourses,
  UpdateCourse,
} from './course.service'
import { catchAsync } from '../utils/catchAsync'

const CourseCreate: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 201,
    success: true,
    message: 'Course created successfully',
    data: await CreateCourse(req.body),
  })
}

const CourseGetAll: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Courses retrieved successfully',
    data: await GetCourses(req.query),
  })
}

const CourseGet: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Course retrieved successfully',
    data: await GetCourse(req.params.id),
  })
}

const CourseUpdate: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Course updated successfully',
    data: await UpdateCourse(req.params.id, req.body),
  })
}

const CourseDelete: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Course deleted successfully',
    data: await DeleteCourse(req.params.id),
  })
}

export const CreateCourseIntoDb = catchAsync(CourseCreate)
export const GetCoursesFromDb = catchAsync(CourseGetAll)
export const GetCourseFromDb = catchAsync(CourseGet)
export const UpdateCourseIntoDb = catchAsync(CourseUpdate)
export const DeleteCourseFromDb = catchAsync(CourseDelete)
