import { departmentModel } from './department.schema'
import { TDepartmentInterface } from './department.type'

export const createDepartmentIntoDb = async (payload: TDepartmentInterface) => {
  return await departmentModel.create(payload)
}

export const getDepartmentsFromDb = async () => {
  return await departmentModel.find({})
}

export const updateDepartmentIntoDb = async (
  id: string,
  payload: Partial<TDepartmentInterface>,
) => {
  return await departmentModel.findByIdAndUpdate(id, payload, { new: true })
}

export const getDepartmentFromDb = async (id: string) => {
  return await departmentModel.findById(id)
}
