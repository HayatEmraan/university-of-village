import mongoose from 'mongoose'
import { studentModel } from './student.schema'
import { TStudent } from './student.type'
import { userModel } from '../user/user.schema'
import AppError from '../../errors/appError'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchFields } from './student.utils'

export const getStudentsFromDb = async (query: Record<string, any>) => {
  const result = new QueryBuilder(studentModel.find(), query)
    .search(searchFields)
    .filter()
    .sort()
    .select()
    .paginate()

  return await result.modelQuery
}

export const getSingleStudentFromDb = async (id: string) => {
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
