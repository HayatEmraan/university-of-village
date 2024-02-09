import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/appError'
import { AcademicSemesterModel } from '../academicSemester/academic.schema'
import { SemesterStatus } from './semester.constant'
import { SemesterRegistrationModel } from './semester.schema'
import { TSemesterRegistration } from './semester.type'
import { OfferedCourseModel } from '../offeredCourse/offered.schema'

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const { academicSemester } = payload
  const isSemesterRegistered = await SemesterRegistrationModel.findOne({
    academicSemester,
  })

  const isExistSemester = await AcademicSemesterModel.findById(academicSemester)

  if (!isExistSemester) {
    throw new AppError(404, 'Semester not found')
  }

  if (isSemesterRegistered) {
    throw new AppError(409, 'Semester is already registered')
  }
  return SemesterRegistrationModel.create(payload)
}

const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const reqUpdateDocument = await SemesterRegistrationModel.findById(id)
  if (!reqUpdateDocument) {
    throw new AppError(404, 'Semester registration not found')
  }
  if (reqUpdateDocument?.status === SemesterStatus.COMPLETED) {
    throw new AppError(400, 'Semester registration is already ended')
  }
  if (
    reqUpdateDocument?.status === SemesterStatus.UPCOMING &&
    payload?.status === SemesterStatus.COMPLETED
  ) {
    throw new AppError(
      400,
      'Semester registration is already upcoming, can not update to completed',
    )
  }
  if (
    reqUpdateDocument?.status === SemesterStatus.ONGOING &&
    payload?.status === SemesterStatus.UPCOMING
  ) {
    throw new AppError(
      400,
      'Semester registration is already ongoing, can not update to upcoming',
    )
  }
  return SemesterRegistrationModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
}

const getAllSemesterRegistration = async (query: Record<string, unknown>) => {
  const resultQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .select()

  const result = await resultQuery.modelQuery
  return {
    result,
    meta: await resultQuery.countTotal(),
  }
}

const getSemesterRegistration = async (id: string) => {
  return SemesterRegistrationModel.findById(id)
}

const deleteSemesterRegistration = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()
    const reqDeleteDocument = await SemesterRegistrationModel.findById(id)
    if (reqDeleteDocument?.status !== SemesterStatus.UPCOMING) {
      throw new AppError(
        400,
        `Semester registration is already ${reqDeleteDocument?.status}, can not delete`,
      )
    }

    await OfferedCourseModel.deleteMany(
      {
        semesterRegistration: reqDeleteDocument?._id,
      },
      { session },
    )

    const result = await SemesterRegistrationModel.findByIdAndDelete(id, {
      session,
    })
    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (error) {
    console.log(error)
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(404, 'Semester registration not deleted')
  }
}

export const SemesterRegistrationService = {
  createSemesterRegistration,
  updateSemesterRegistration,
  getAllSemesterRegistration,
  getSemesterRegistration,
  deleteSemesterRegistration,
}
