export type TUser = {
  id: string
  password: string
  needsPasswordChange: boolean
  role: 'student' | 'admin' | 'faculty'
  status: 'active' | 'blocked'
  isDeleted: boolean
}
