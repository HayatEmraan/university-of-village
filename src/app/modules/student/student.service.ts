import mongoose from 'mongoose'
import { studentModel } from './student.schema'
import { TStudent } from './student.type'
import { userModel } from '../user/user.schema'
import AppError from '../../errors/appError'

export const getStudentsFromDb = async (query: Record<string, any>) => {
  const queryObj = { ...query }

  const excludeFields = ['sort', 'limit', 'email', 'select']
  excludeFields.forEach(el => delete queryObj[el])

  const searchQuery = studentModel
    .find({
      $or: ['name.firstName', 'name.lastName', 'name.middleName'].map(key => ({
        [key]: {
          $regex: queryObj.q ? queryObj.q : '',
          $options: 'i',
        },
      })),
    })
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  let sort = '-createdAt'
  if (query.sort) {
    sort = query.sort
  }
  const sortQuery = searchQuery.sort(sort)
  let limit = 5
  let skip = 0
  if (query.limit) {
    limit = Number(query.limit)
    skip = Number(query.page || 1 - 1) * Number(query.limit)
  }

  const paginateQuery = sortQuery.skip(skip).limit(limit)
  let select = ''
  if (query.select) {
    select = query.select.split(',').join(' ')
  }
  const selectQuery = await paginateQuery.select(select)
  return selectQuery
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
