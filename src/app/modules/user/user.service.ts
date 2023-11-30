import { studentModel } from '../student/student.schema'
import { TStudent } from '../student/student.type'
import { userModel } from './user.schema'

const randNum = () => {
  return Math.ceil(Math.random() * 100000)
}

const SID = (): string => {
  const random = randNum()
  if (random >= 10000) {
    return `UOV${random}`
  } else {
    return SID()
  }
}

const randomPass = () => {
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

export const CreateStudentUR = async (password: string, student: TStudent) => {
  const user = {
    id: SID(),
    password: password || randomPass(),
  }
  const insertUser = await userModel.create(user)
  if (Object.keys(insertUser).length) {
    return await studentModel.create({
      ...student,
      user: insertUser._id,
      id: insertUser.id,
    })
  } else {
    throw new Error('User not created')
  }
}
