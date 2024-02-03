import { SUPER_ADMIN_PASS } from '../config'
import { authOptions } from '../interface/auth.options'
import { userModel } from '../modules/user/user.schema'

const superUser = {
  id: 'UOV-SU-0001',
  email: 'super@uov.com',
  password: SUPER_ADMIN_PASS,
  needsPasswordChange: false,
  role: authOptions.superAdmin,
  status: 'active',
  isDeleted: false,
}

const seedSuperAdmin = async () => {
  const isSuperAdmin = await userModel.findOne({ role: authOptions.superAdmin })

  if (!isSuperAdmin) {
    await userModel.create(superUser)
  }
}

export default seedSuperAdmin
