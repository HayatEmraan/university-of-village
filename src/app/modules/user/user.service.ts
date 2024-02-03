/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { deleteImage, uploadImage } from '../utils/uploadImage'
import { departmentModel } from '../academicDepartment/department.schema'

export const CreateStudentUR = async (
  password: string,
  student: TStudent,
  file: any,
) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()
    const findSemester = await AcademicSemesterModel.findById(
      student.academicSemester,
    ).session(session)

    if (!findSemester) {
      throw new AppError(404, 'Semester not found')
    }

    const findDepartment = await departmentModel
      .findById(student.academicDepartment)
      .session(session)

    if (!findDepartment) {
      throw new AppError(404, 'Department not found')
    }

    const user = {
      id: await generateId(findSemester as TAcademicSemester),
      email: student?.email,
      password: password || randomPass(),
    }
    const insertUser = await userModel.create([user], { session })

    if (!insertUser) {
      throw new AppError(400, 'Failed to create user')
    }

    let image

    if (file) {
      image = await uploadImage(
        `${student?.name?.firstName}-${user?.id}`,
        file.path,
      )
    }

    const createStudent = await studentModel.create(
      [
        {
          ...student,
          user: insertUser[0]._id,
          id: insertUser[0].id,
          academicFaculty: findDepartment.academicFaculty,
          profileImage: image?.secure_url || '',
        },
      ],
      { session },
    )

    if (!createStudent) {
      throw new AppError(400, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()
    return createStudent
  } catch (error: AppError | any) {
    if (file) {
      deleteImage(file.path)
    }
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(error.statusCode || 500, error.message)
  }
}

export const CreateFacultyUR = async (
  password: string,
  faculty: TUFaculty,
  file: any,
) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()

    const findDepartment = await departmentModel
      .findById(faculty.academicDepartment)
      .session(session)

    if (!findDepartment) {
      throw new AppError(404, ' Academic Department not found')
    }

    const user = {
      id: await generateFacultyId(),
      email: faculty?.email,
      password: password || randomPass(),
      role: 'faculty',
    }
    const createUserFaculty = await userModel.create([user], { session })

    if (!createUserFaculty) {
      throw new AppError(400, 'Failed to create user')
    }

    let image

    if (file) {
      image = await uploadImage(
        `${faculty?.name?.firstName}-${user?.id}`,
        file.path,
      )
    }
    const createFaculty = await UFacultyModel.create(
      [
        {
          ...faculty,
          user: createUserFaculty[0]._id,
          id: createUserFaculty[0].id,
          profileImage: image?.secure_url || '',
          academicFaculty: findDepartment.academicFaculty,
        },
      ],
      { session },
    )

    if (!createFaculty) {
      throw new AppError(400, 'Failed to create faculty')
    }

    await session.commitTransaction()
    await session.endSession()
    return createFaculty
  } catch (error: AppError | any) {
    if (file) {
      deleteImage(file.path)
    }
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(error.statusCode || 500, error.message)
  }
}

export const CreateAdmin = async (
  password: string,
  admin: TAdmin,
  file: any,
) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()
    const user = {
      id: await generateAdminId(),
      email: admin?.email,
      password: password || randomPass(),
      role: 'admin',
    }

    const createUserAdmin = await userModel.create([user], { session })

    if (!createUserAdmin) {
      throw new AppError(400, 'Failed to create user')
    }
    let image
    if (file) {
      image = await uploadImage(
        `${admin?.name?.firstName}-${user?.id}`,
        file.path,
      )
    }

    const createAdmin = await AdminModel.create([
      {
        ...admin,
        user: createUserAdmin[0]._id,
        id: createUserAdmin[0].id,
        profileImage: image?.secure_url || '',
      },
    ])

    if (!createAdmin) {
      throw new AppError(400, 'Failed to create admin')
    }
    await session.commitTransaction()
    await session.endSession()
    return createAdmin
  } catch (error: AppError | any) {
    if (file) {
      deleteImage(file.path)
    }
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(error.statusCode || 500, error.message)
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
