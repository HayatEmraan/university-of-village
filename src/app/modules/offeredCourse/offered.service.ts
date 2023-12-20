import QueryBuilder from '../../builder/QueryBuilder'
import { OfferedCourseModel } from './offered.schema'
import { TOfferedCourse } from './offered.type'

const createOfferedCourse = async (payload: TOfferedCourse) => {
  return await OfferedCourseModel.create(payload)
}

const getAllOfferedCourse = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(
    OfferedCourseModel.find().populate('semesterRegistration'),
    query,
  )
    .filter()
    .sort()
    .select()
    .paginate()

  return await result.modelQuery
}

const getOfferedCourse = async (id: string) => {
  return await OfferedCourseModel.findById(id)
}

const updateOfferedCourse = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  return await OfferedCourseModel.findByIdAndUpdate(id, payload, { new: true })
}

export const OfferedCourseService = {
  createOfferedCourse,
  getAllOfferedCourse,
  getOfferedCourse,
  updateOfferedCourse,
}
