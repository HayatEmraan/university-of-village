export const authOptions = {
  admin: 'admin',
  faculty: 'faculty',
  student: 'student',
} as const

export type TAuthOptions = keyof typeof authOptions
