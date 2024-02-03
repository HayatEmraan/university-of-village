import { RequestHandler } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { globalResponseHandler } from '../utils/globalResponseHandler'
import {
  deleteSingleStudentFromDb,
  getSingleStudentFromDb,
  getStudentsFromDb,
  updateSingleStudentFromDb,
} from './student.service'
import { NonPrimitive } from './student.utils'

const getStudents: RequestHandler = async (req, res) => {
  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Students retrieved successfully',
    data: await getStudentsFromDb(req.query),
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
  const { name, localGuardian, guardian, ...restInfo } = req.body.student

  const updatedInfo = new NonPrimitive({ ...restInfo })
    .Parent('name', name)
    .Parent('localGuardian', localGuardian)
    .Child('guardian', guardian).modifiedDocument

  return globalResponseHandler(res, {
    status: 200,
    success: true,
    message: 'Student updated successfully',
    data: await updateSingleStudentFromDb(req.params.id, updatedInfo),
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
