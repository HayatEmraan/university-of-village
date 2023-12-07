
import AppError from '../../errors/appError'
import { TAcademicSemester } from './academic.interface'
import { AcademicSemesterModel } from './academic.schema'
import { SemesterValidate } from './academic.validate'

export const createAcademicSemester = (payload: TAcademicSemester) => {
  if (SemesterValidate[payload.name] !== payload.code) {
    throw new AppError(422, 'Invalid Semester code')
  }
  return AcademicSemesterModel.create(payload)
}

export const getAcademicSemesters = async () => {
  return await AcademicSemesterModel.find({})
}

export const getSingleSemesterById = async (id: string) => {
  return await AcademicSemesterModel.findOne({ _id: id })
}

export const updateSingleSemester = async (
  id: string,
  update: Partial<TAcademicSemester>,
) => {
  return await AcademicSemesterModel.updateOne({ _id: id }, update)
}
