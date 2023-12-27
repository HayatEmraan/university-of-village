import { OfferedCourseModel } from './../offeredCourse/offered.schema'
import { studentModel } from '../student/student.schema'
import { EnrolledModel } from './enrolled.schema'
import mongoose from 'mongoose'
import AppError from '../../errors/appError'

const createEnrolledCourse = async (
  user: string,
  payload: { offeredCourse: string },
) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()
    const isStudentExit = await studentModel.findOne(
      { id: user },
      { _id: 1, isDeleted: 1 },
    )
    if (!isStudentExit) {
      throw new Error('Student not found')
    } else if (isStudentExit.isDeleted) {
      throw new Error('Student not found')
    }

    const isOfferedCourseExit = await OfferedCourseModel.findById(
      payload?.offeredCourse,
    )
    if (!isOfferedCourseExit) {
      throw new Error('Offered Course not found')
    }

    const isStudentAlreadyEnrolled = await EnrolledModel.findOne({
      student: isStudentExit._id,
      offeredCourse: isOfferedCourseExit?._id,
      academicSemester: isOfferedCourseExit?.academicSemester,
      academicDepartment: isOfferedCourseExit?.academicDepartment,
      course: isOfferedCourseExit?.course,
    })

    if (isStudentAlreadyEnrolled) {
      throw new Error('Student already enrolled in this course')
    }

    const finalQuery = {
      student: isStudentExit._id,
      offeredCourse: isOfferedCourseExit?._id,
      academicSemester: isOfferedCourseExit?.academicSemester,
      academicDepartment: isOfferedCourseExit?.academicDepartment,
      semesterRegistration: isOfferedCourseExit?.semesterRegistration,
      course: isOfferedCourseExit?.course,
      faculty: isOfferedCourseExit?.faculty,
      isEnrolled: true,
    }
    if (isOfferedCourseExit.maxCapacity <= 0) {
      throw new AppError(400, 'Course is full')
    }
    await OfferedCourseModel.findByIdAndUpdate(
      payload?.offeredCourse,
      {
        $inc: { maxCapacity: -1 },
      },
      { session },
    )
    const result = await EnrolledModel.create([finalQuery], { session })
    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(400, error.message)
  }
}

export const EnrolledCourseService = {
  createEnrolledCourse,
}
