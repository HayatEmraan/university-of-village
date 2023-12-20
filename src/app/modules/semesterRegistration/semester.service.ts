import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/appError'
import { AcademicSemesterModel } from '../academicSemester/academic.schema'
import { SemesterRegistrationModel } from './semester.schema'
import { TSemesterRegistration } from './semester.type'

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
  return SemesterRegistrationModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
}

const getAllSemesterRegistration = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .select()
  return await result.modelQuery
}

const getSemesterRegistration = async (id: string) => {
  return SemesterRegistrationModel.findById(id)
}

export const SemesterRegistrationService = {
  createSemesterRegistration,
  updateSemesterRegistration,
  getAllSemesterRegistration,
  getSemesterRegistration,
}
