import { facultyModel } from './faculty.schema'
import { TFacultyInterface } from './faculty.type'

export const createFacultyIntoDb = async (payload: TFacultyInterface) => {
  return await facultyModel.create(payload)
}

export const getAcademicFaculties = async () => {
  return await facultyModel.find({})
}

export const getSingleAcademicFAcultyFromDb = async (id: string) => {
  return await facultyModel.findById(id)
}

export const updateSingleFacultyIntoDb = async (
  id: string,
  payload: TFacultyInterface,
) => {
  return await facultyModel.findByIdAndUpdate(id, payload, { new: true })
}
