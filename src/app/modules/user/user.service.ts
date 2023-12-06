import { TAcademicSemester } from '../academicSemester/academic.interface'
import { AcademicSemesterModel } from '../academicSemester/academic.schema'
import { studentModel } from '../student/student.schema'
import { TStudent } from '../student/student.type'
import { userModel } from './user.schema'
import { generateId, randomPass } from './user.utils'



export const CreateStudentUR = async (password: string, student: TStudent) => {
  const findSemester = await AcademicSemesterModel.findById(
    student.academicSemester,
  )
  const user = {
    id: await generateId(findSemester as TAcademicSemester),
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
