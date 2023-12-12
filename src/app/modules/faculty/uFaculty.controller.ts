import { RequestHandler } from 'express'
import { catchAsync } from '../utils/catchAsync'
import {
  deleteSingleUFacultyFromDb,
  getSingleUFacultyFromDb,
  getUFacultiesFromDb,
  updateSingleUFacultyIntoDb,
} from './uFaculty.service'
import { globalResponseHandler } from '../utils/globalResponseHandler'

const getUFaculties: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Students retrieved successfully',
    data: await getUFacultiesFromDb(),
  })
}

const getUFaculty: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Student retrieved successfully',
    data: await getSingleUFacultyFromDb(req.params.id),
  })
}

const updateUFaculty: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Student updated successfully',
    data: await updateSingleUFacultyIntoDb(req.params.id, req.body),
  })
}

const deleteUFaculty: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Student deleted successfully',
    data: await deleteSingleUFacultyFromDb(req.params.id),
  })
}

export const uFacultiesGet = catchAsync(getUFaculties)
export const uFacultyGet = catchAsync(getUFaculty)
export const uFacultyUpdate = catchAsync(updateUFaculty)
export const uFacultyDelete = catchAsync(deleteUFaculty)
