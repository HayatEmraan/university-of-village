import { RequestHandler } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { globalResponseHandler } from '../utils/globalResponseHandler'
import {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleSemesterById,
  updateSingleSemester,
} from './academic.service'

const createAcademic: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Academic semester created successfully',
    data: await createAcademicSemester(req.body),
  })
}

const getAcademics: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Academic semesters retrieved successfully',
    data: await getAcademicSemesters(),
  })
}

const getAcademic: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Academic semester retrieved successfully',
    data: await getSingleSemesterById(req.params.id),
  })
}

const updateAcademic: RequestHandler = async(req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Academic semester updated successfully',
    data: await updateSingleSemester(req.params.id, req.body),
  })
}

export const createSemester = catchAsync(createAcademic)

export const getSemesters = catchAsync(getAcademics)

export const getSingleSemester = catchAsync(getAcademic)

export const updateSemester = catchAsync(updateAcademic)
