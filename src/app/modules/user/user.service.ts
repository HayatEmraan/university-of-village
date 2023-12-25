import mongoose from 'mongoose'
import { TAcademicSemester } from '../academicSemester/academic.interface'
import { AcademicSemesterModel } from '../academicSemester/academic.schema'
import { studentModel } from '../student/student.schema'
import { TStudent } from '../student/student.type'
import { userModel } from './user.schema'
import {
  generateAdminId,
  generateFacultyId,
  generateId,
  randomPass,
} from './user.utils'
import AppError from '../../errors/appError'
import { TUFaculty } from '../faculty/uFaculty.type'
import { UFacultyModel } from '../faculty/uFaculty.schema'
import { TAdmin } from '../admin/admin.interface'
import { AdminModel } from '../admin/admin.schema'

export const CreateStudentUR = async (password: string, student: TStudent) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()
    const findSemester = await AcademicSemesterModel.findById(
      student.academicSemester,
    ).session(session)
    const user = {
      id: await generateId(findSemester as TAcademicSemester),
      email: student?.email,
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

export const CreateFacultyUR = async (password: string, faculty: TUFaculty) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()
    const createUserFaculty = await userModel.create(
      [
        {
          id: await generateFacultyId(),
          email: faculty?.email,
          password: password || randomPass(),
          role: 'faculty',
        },
      ],
      { session },
    )
    const createFaculty = await UFacultyModel.create(
      [
        {
          ...faculty,
          user: createUserFaculty[0]._id,
          id: createUserFaculty[0].id,
        },
      ],
      { session },
    )

    await session.commitTransaction()
    await session.endSession()
    return createFaculty
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(501, 'Faculty not created')
  }
}

export const CreateAdmin = async (password: string, admin: TAdmin) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()
    const createUserAdmin = await userModel.create(
      [
        {
          id: await generateAdminId(),
          email: admin?.email,
          password: password || randomPass(),
          role: 'admin',
        },
      ],
      { session },
    )

    const createAdmin = await AdminModel.create([
      {
        ...admin,
        user: createUserAdmin[0]._id,
        id: createUserAdmin[0].id,
      },
    ])
    await session.commitTransaction()
    await session.endSession()
    return createAdmin
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(501, 'Admin not created')
  }
}

export const getMeById = async (id: string, role: string) => {
  if (role === 'student')
    return await studentModel
      .findOne({ id })
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('user')
  if (role === 'admin') return await AdminModel.findOne({ id }).populate('user')
  if (role === 'faculty')
    return await UFacultyModel.findOne({ id }).populate('user')
}

export const changeStatusById = async (
  id: string,
  status: { status: string },
) => {
  const isExit = await userModel.findOne({ _id: id, isDeleted: false })
  if (!isExit) {
    throw new AppError(404, 'User not found')
  }
  return await userModel.findByIdAndUpdate(id, status, { new: true })
}
