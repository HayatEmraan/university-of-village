import { SemesterStatus } from './../semesterRegistration/semester.constant'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/appError'
import { departmentModel } from '../academicDepartment/department.schema'
import { facultyModel } from '../academicFaculty/faculty.schema'
import { CourseModel } from '../course/course.schema'
import { UFacultyModel } from '../faculty/uFaculty.schema'
import { SemesterRegistrationModel } from '../semesterRegistration/semester.schema'
import { OfferedCourseModel } from './offered.schema'
import { TOfferedCourse } from './offered.type'
import { hasTimeConflict } from './offered.utils'
import { studentModel } from '../student/student.schema'

const createOfferedCourse = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload

  const isSemesterRegistrationExit =
    await SemesterRegistrationModel.findById(semesterRegistration)

  if (!isSemesterRegistrationExit) {
    throw new AppError(404, 'Semester registration not found')
  }

  const isAcademicFacultyExit = await facultyModel.findById(academicFaculty)
  if (!isAcademicFacultyExit) {
    throw new AppError(404, 'Academic faculty not found')
  }

  const isAcademicDepartmentExit =
    await departmentModel.findById(academicDepartment)
  if (!isAcademicDepartmentExit) {
    throw new AppError(404, 'Academic department not found')
  }

  const isCourseExit = await CourseModel.findById(course)
  if (!isCourseExit) {
    throw new AppError(404, 'Course not found')
  }

  const isFacultyExit = await UFacultyModel.findById(faculty)
  if (!isFacultyExit) {
    throw new AppError(404, 'Faculty not found')
  }

  const isAcademicDepartmentBelongToAcademicFaculty =
    await departmentModel.findOne({
      _id: academicDepartment,
      academicFaculty: academicFaculty,
    })

  if (!isAcademicDepartmentBelongToAcademicFaculty) {
    throw new AppError(
      404,
      'Academic department is not belong to academic faculty',
    )
  }

  const isOfferedSectionExit = await OfferedCourseModel.findOne({
    academicFaculty,
    academicDepartment,
    section: payload.section,
  })

  if (isOfferedSectionExit) {
    throw new AppError(409, 'Section is already offered')
  }

  const assignedFacultyTiming = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: {
      $in: payload.days,
    },
  }).select('startTime endTime days')

  const upcomingAssignFacultyTiming = {
    startTime: payload?.startTime,
    endTime: payload?.endTime,
    days: payload?.days,
  }

  if (hasTimeConflict(assignedFacultyTiming, upcomingAssignFacultyTiming)) {
    throw new AppError(409, 'Time Conflict found')
  }

  return await OfferedCourseModel.create({
    ...payload,
    academicSemester: isSemesterRegistrationExit.academicSemester,
  })
}

const getAllOfferedCourse = async (query: Record<string, unknown>) => {
  const OfferedCourseQuery = new QueryBuilder(
    OfferedCourseModel.find().populate('semesterRegistration'),
    query,
  )
    .filter()
    .sort()
    .select()
    .paginate()

  const result = await OfferedCourseQuery.modelQuery
  const meta = await OfferedCourseQuery.countTotal()

  return {
    result,
    meta,
  }
}

const getOfferedCourse = async (id: string) => {
  return await OfferedCourseModel.findById(id)
}

const updateOfferedCourse = async (
  id: string,
  payload: Pick<TOfferedCourse, 'days' | 'startTime' | 'endTime' | 'faculty'>,
) => {
  const { faculty, days } = payload

  const isOfferedCourseExit = await OfferedCourseModel.findById(id)
  if (!isOfferedCourseExit) {
    throw new AppError(404, 'Offered course not found')
  }
  const hasFaculty = await UFacultyModel.findById(payload.faculty)
  if (!hasFaculty) {
    throw new AppError(404, 'Faculty not found')
  }

  const semesterRegistration = isOfferedCourseExit.semesterRegistration
  const assignedFacultyTiming = await OfferedCourseModel.aggregate([
    {
      $match: {
        semesterRegistration,
        faculty,
        days: {
          $in: days,
        },
      },
    },
  ])

  const upcomingAssignFacultyTiming = {
    startTime: payload?.startTime,
    endTime: payload?.endTime,
    days: payload?.days,
  }

  if (hasTimeConflict(assignedFacultyTiming, upcomingAssignFacultyTiming)) {
    throw new AppError(409, 'Time Conflict found')
  }

  const semesterRegistrationStatus = await SemesterRegistrationModel.findById(
    isOfferedCourseExit.semesterRegistration,
  )

  if (semesterRegistrationStatus?.status !== SemesterStatus.UPCOMING) {
    throw new AppError(409, 'Semester registration is not upcoming')
  }

  return await OfferedCourseModel.findByIdAndUpdate(id, payload, { new: true })
}

const deleteOfferedCourse = async (id: string) => {
  const isOfferedCourseExit = await OfferedCourseModel.findById(id)
  if (!isOfferedCourseExit) {
    throw new AppError(404, 'Offered course not found')
  }
  const isSemesterRegistrationUpcoming =
    await SemesterRegistrationModel.findById(
      isOfferedCourseExit.semesterRegistration,
    ).select('status')

  if (isSemesterRegistrationUpcoming?.status !== SemesterStatus.UPCOMING) {
    throw new AppError(409, 'Semester registration is not upcoming')
  }
  return await OfferedCourseModel.findByIdAndDelete(id)
}

const getMyOfferedCourse = async (
  id: string,
  query: Record<string, unknown>,
) => {
  const { page, limit } = query

  const pageLimit = Number(page) || 1

  const limitValue = Number(limit) || 10

  const skipValue = (pageLimit - 1) * limitValue

  const activeStudent = await studentModel.findOne({
    id,
  })

  if (!activeStudent) {
    throw new AppError(404, 'Student not found')
  }

  const ongoingRegistrationSemester = await SemesterRegistrationModel.findOne({
    status: SemesterStatus.ONGOING,
  })

  if (!ongoingRegistrationSemester) {
    throw new AppError(404, 'Semester not found')
  }

  const aggregateQuery = [
    {
      $match: {
        semesterRegistration: ongoingRegistrationSemester._id,
        academicDepartment: activeStudent.academicDepartment,
        academicFaculty: activeStudent.academicFaculty,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $lookup: {
        from: 'enrolleds',
        let: {
          semesterId: ongoingRegistrationSemester._id,
          studentId: activeStudent._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$semesterRegistration', '$$semesterId'],
                  },
                  {
                    $eq: ['$student', '$$studentId'],
                  },
                  {
                    $eq: ['$isEnrolled', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'enrolledCourses',
      },
    },
    {
      $lookup: {
        from: 'enrolleds',
        let: {
          semesterId: ongoingRegistrationSemester._id,
          studentId: activeStudent._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$student', '$$studentId'],
                  },
                  {
                    $eq: ['$isCompleted', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'completedCourse',
      },
    },
    {
      $addFields: {
        completedCourseId: {
          $map: {
            input: '$completedCourse',
            as: 'completed',
            in: '$$completed.course',
          },
        },
      },
    },
    {
      $addFields: {
        prerequisitesFulfilled: {
          $or: [
            {
              $eq: ['$course.preRequisiteCourses', []],
            },
            {
              $setIsSubset: [
                '$course.preRequisiteCourses.course',
                '$completedCourseId',
              ],
            },
          ],
        },
        alreadyEnrolled: {
          $in: [
            '$course._id',
            {
              $map: {
                input: '$enrolledCourses',
                as: 'enrolled',
                in: '$$enrolled.course',
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        prerequisitesFulfilled: true,
        alreadyEnrolled: false,
      },
    },
  ]

  const paginateQuery = [
    {
      $skip: skipValue,
    },
    {
      $limit: limitValue,
    },
  ]

  const result = await OfferedCourseModel.aggregate([
    ...aggregateQuery,
    ...paginateQuery,
  ])

  const total = (await OfferedCourseModel.aggregate(aggregateQuery)).length

  return {
    meta: {
      page: pageLimit,
      limit: limitValue,
      total,
      totalPage: Math.ceil(total / limitValue),
    },
    data: result,
  }
}

export const OfferedCourseService = {
  createOfferedCourse,
  getAllOfferedCourse,
  getOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
  getMyOfferedCourse,
}
