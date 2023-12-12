import { TAcademicSemester } from '../academicSemester/academic.interface'
import { userModel } from './user.schema'

const lastUserId = async (year: string, code: string) => {
  const findLast = await userModel
    .findOne({
      role: 'student',
      id: {
        $regex: new RegExp(`^UOV${year}${code}`),
      },
    })
    .sort({ _id: -1 })
    .lean()
  return findLast?.id.substring(9)
}

export const generateId = async (payload: TAcademicSemester) => {
  const currentId =
    (await lastUserId(payload.year, payload.code)) || (0).toString()
  const id = (Number(currentId) + 1).toString().padStart(5, '0')
  return `UOV${payload.year}${payload.code}${id}`
}

export const randomPass = () => {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const specialCharacters = '!@#$%^&*()_+{}[]|;:,.<>?'

  const allCharacters =
    uppercaseLetters + lowercaseLetters + numbers + specialCharacters
  let password = ''

  for (let i = 0; i < 11; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length)
    password += allCharacters[randomIndex]
  }
  return password
}

const lastFacultyId = async () => {
  const findLast = await userModel
    .findOne({
      role: 'faculty',
    })
    .sort({ _id: -1 })
    .lean()
  return findLast?.id.substring(6)
}

export const generateFacultyId = async () => {
  const currentId = (await lastFacultyId()) || (0).toString()
  const id = (Number(currentId) + 1).toString().padStart(5, '0')
  return `UOV-F-${id}`
}