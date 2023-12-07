import mongoose from 'mongoose'
import { TAcademicSemester } from '../academicSemester/academic.interface'
import { AcademicSemesterModel } from '../academicSemester/academic.schema'
import { studentModel } from '../student/student.schema'
import { TStudent } from '../student/student.type'
import { userModel } from './user.schema'
import { generateId, randomPass } from './user.utils'
import AppError from '../../errors/appError'


export const CreateStudentUR = async (password: string, student: TStudent) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()
    const findSemester = await AcademicSemesterModel.findById(
      student.academicSemester,
    ).session(session)
    const user = {
      id: await generateId(findSemester as TAcademicSemester),
      password: password || randomPass(),
    }
    const insertUser = await userModel.create([user], { session })
    const createStudent = await studentModel.create(
      [
        {
          ...student,
          user: insertUser[0]._id,
          id: insertUser[0].id,
        },
      ],
      { session },
    )
    await session.commitTransaction()
    await session.endSession()
    return createStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(501, 'User not created')
  }
}
