import { TAdmin } from './admin.interface'
import { AdminModel } from './admin.schema'

export const handleGetAdmins = async () => {
  return await AdminModel.find({})
}

export const handleGetAdmin = async (id: string) => {
  return await AdminModel.findById(id)
}

export const handleUpdateAdmin = async (
  id: string,
  payload: Partial<TAdmin>,
) => {
  return await AdminModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
}

export const handleDeleteAdmin = async (id: string) => {
  return await AdminModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  )
}
