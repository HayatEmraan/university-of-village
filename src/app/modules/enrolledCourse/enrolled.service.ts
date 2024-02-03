import { OfferedCourseModel } from './../offeredCourse/offered.schema'
import { studentModel } from '../student/student.schema'
import { EnrolledModel } from './enrolled.schema'
import mongoose from 'mongoose'
import AppError from '../../errors/appError'
import { SemesterRegistrationModel } from '../semesterRegistration/semester.schema'
import { CourseModel } from '../course/course.schema'
import { TEnrolled } from './enrolled.type'
import { facultyModel } from '../academicFaculty/faculty.schema'

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
    const findingSemesterRegistration =
      await SemesterRegistrationModel.findById(
        isOfferedCourseExit?.semesterRegistration,
      ).select('maxCredits')
    if (!findingSemesterRegistration) {
      throw new Error('Semester registration not found')
    }

    const enrolledCourses = await EnrolledModel.aggregate([
      {
        $match: {
          student: isStudentExit._id,
          academicSemester: isOfferedCourseExit?.academicSemester,
        },
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'courses',
        },
      },
      {
        $unwind: '$courses',
      },
      {
        $group: {
          _id: null,
          totalCredits: {
            $sum: '$courses.credits',
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalCredits: 1,
        },
      },
    ])

    const credits = enrolledCourses[0]?.totalCredits
    const upcomingCredits = await CourseModel.findById(
      isOfferedCourseExit?.course,
    ).select('credits')

    if (
      credits &&
      credits + upcomingCredits?.credits >=
        findingSemesterRegistration.maxCredits
    ) {
      throw new AppError(400, 'Maximum credits exceeded')
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

const updateEnrolledCourse = async (
  user: string,
  payload: Partial<TEnrolled>,
) => {
  const { student, offeredCourse, semesterRegistration, courseMarks } = payload

  const isStudentExit = await studentModel.findById(student, {
    _id: 1,
    isDeleted: 1,
  })
  if (!isStudentExit) {
    throw new Error('Student not found')
  } else if (isStudentExit.isDeleted) {
    throw new Error('Student not found')
  }

  const isOfferedCourseExit = await OfferedCourseModel.findById(offeredCourse)
  if (!isOfferedCourseExit) {
    throw new Error('Offered Course not found')
  }

  const findingSemesterRegistration =
    await SemesterRegistrationModel.findById(semesterRegistration)
  if (!findingSemesterRegistration) {
    throw new Error('Semester registration not found')
  }

  const isFacultyExit = await facultyModel.findOne({
    id: user,
  })
  const isCourseFacultyBelong = await EnrolledModel.findOne({
    student,
    offeredCourse,
    semesterRegistration,
    faculty: isFacultyExit?._id,
  })

  console.log(isCourseFacultyBelong)

  if (!isCourseFacultyBelong) {
    throw new Error('You are not authorized to update this course')
  }

  const modifiedCourseMarks: Record<string, unknown> = {
    ...courseMarks,
  }

  if (courseMarks && Object.keys(courseMarks).length > 0) {
    for (const [key, value] of Object.entries(modifiedCourseMarks)) {
      modifiedCourseMarks[`courseMarks.${key}`] = value
    }
  }

  return await EnrolledModel.findOneAndUpdate(
    {
      student,
      offeredCourse,
      semesterRegistration,
    },
    modifiedCourseMarks,
    { new: true },
  )
}

export const EnrolledCourseService = {
  createEnrolledCourse,
  updateEnrolledCourse,
}
