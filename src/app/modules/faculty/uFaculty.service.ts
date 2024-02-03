import { TFacultyInterface } from '../academicFaculty/faculty.type'
import { UFacultyModel } from './uFaculty.schema'

export const getUFacultiesFromDb = async () => {
  return await UFacultyModel.find({})
}

export const getSingleUFacultyFromDb = async (id: string) => {
  return await UFacultyModel.findById(id)
}

export const updateSingleUFacultyIntoDb = async (
  id: string,
  payload: Partial<TFacultyInterface>,
) => {
  return await UFacultyModel.findByIdAndUpdate(id, payload, { new: true })
}

export const deleteSingleUFacultyFromDb = async (id: string) => {
  return await UFacultyModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  )
}
