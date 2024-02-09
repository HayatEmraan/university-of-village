import mongoose from 'mongoose'
import { studentModel } from './student.schema'
import { TStudent } from './student.type'
import { userModel } from '../user/user.schema'
import AppError from '../../errors/appError'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchFields } from './student.utils'

export const getStudentsFromDb = async (query: Record<string, unknown>) => {
  const resultQuery = new QueryBuilder(
    studentModel.find().populate('user'),
    query,
  )
    .search(searchFields)
    .filter()
    .sort()
    .select()
    .paginate()

  const result = await resultQuery.modelQuery

  return {
    result,
    meta: await resultQuery.countTotal(),
  }
}

export const getSingleStudentFromDb = async (id: string) => {
  const value = await studentModel.findOne({ _id: id, isDeleted: false })
  if (!value) {
    throw new AppError(404, 'Student not found')
  }
  return await studentModel
    .findById(id)
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
}

export const updateSingleStudentFromDb = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  return await studentModel.findByIdAndUpdate(id, payload, {
    new: true,
  })
}

export const deleteSingleStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()
    await studentModel
      .findOneAndUpdate({ id }, { isDeleted: true })
      .session(session)
    await userModel
      .findOneAndUpdate(
        { id },
        {
          isDeleted: true,
        },
      )
      .session(session)
    await session.commitTransaction()
    await session.endSession()
    return
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(404, 'Student not deleted')
  }
}
