export const authOptions = {
  admin: 'admin',
  faculty: 'faculty',
  student: 'student',
  superAdmin: 'superAdmin',
} as const

export type TAuthOptions = keyof typeof authOptions
