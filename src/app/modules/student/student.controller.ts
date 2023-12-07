import { RequestHandler } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { globalResponseHandler } from '../utils/globalResponseHandler'
import {
  deleteSingleStudentFromDb,
  getSingleStudentFromDb,
  getStudentsFromDb,
  updateSingleStudentFromDb,
} from './student.service'

const getStudents: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Students retrieved successfully',
    data: await getStudentsFromDb(),
  })
}

const getSingleStudent: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Student retrieved successfully',
    data: await getSingleStudentFromDb(req.params.id),
  })
}

const updateStudent: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Student updated successfully',
    data: await updateSingleStudentFromDb(req.params.id, req.body.student),
  })
}

const deleteStudent: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Student deleted successfully',
    data: await deleteSingleStudentFromDb(req.params.id),
  })
}

export const studentsGet = catchAsync(getStudents)

export const studentGet = catchAsync(getSingleStudent)

export const studentUpdate = catchAsync(updateStudent)

export const studentDelete = catchAsync(deleteStudent)