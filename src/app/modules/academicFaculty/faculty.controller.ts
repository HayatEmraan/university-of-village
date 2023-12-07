import { RequestHandler } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { globalResponseHandler } from '../utils/globalResponseHandler'
import {
  createFacultyIntoDb,
  getAcademicFaculties,
  getSingleAcademicFAcultyFromDb,
  updateSingleFacultyIntoDb,
} from './faculty.service'

const facultyCreate: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Academic Faculty created successfully',
    data: await createFacultyIntoDb(req.body),
  })
}

const getFaculties: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Academic faculties retrieved successfully',
    data: await getAcademicFaculties(),
  })
}

const updateFaculty: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Academic faculty updated successfully',
    data: await updateSingleFacultyIntoDb(req.params.id, req.body),
  })
}

const getSingleFaculty: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Academic faculty retrieved successfully',
    data: await getSingleAcademicFAcultyFromDb(req.params.id),
  })
}

export const createFaculty = catchAsync(facultyCreate)

export const AcademicFaculties = catchAsync(getFaculties)

export const getSingleAcademicFAculty = catchAsync(getSingleFaculty)

export const updateSingleFaculty = catchAsync(updateFaculty)
