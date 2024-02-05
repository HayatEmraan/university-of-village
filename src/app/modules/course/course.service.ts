import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { TCourse, TCourseFaculties } from './course.interface'
import { CourseFacultiesModel, CourseModel } from './course.schema'
import AppError from '../../errors/appError'
import { UFacultyModel } from '../faculty/uFaculty.schema'

export const GetCourses = async function (query: Record<string, unknown>) {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
  return await courseQuery
    .search(['title', 'prefix'])
    .filter()
    .sort()
    .select()
    .paginate().modelQuery
}

export const CreateCourse = async (payload: TCourse) => {
  const { preRequisiteCourses } = payload

  const preRequisiteCoursesAdded = preRequisiteCourses.map((el) => el.course)

  const findCourse = await CourseModel.find({
    _id: {
      $in: preRequisiteCoursesAdded,
    },
  })

  if (findCourse.length !== preRequisiteCoursesAdded.length) {
    throw new AppError(400, 'Course not found')
  }
  return CourseModel.create(payload)
}

export const UpdateCourse = async (id: string, payload: TCourse) => {
  const { preRequisiteCourses, ...restPayload } = payload
  const preRequisiteCoursesDeleted = preRequisiteCourses
    ?.filter((el) => el.isDeleted && el.course)
    .map((el) => el.course)
  const preRequisiteCoursesAdded = preRequisiteCourses?.filter(
    (el) => !el.isDeleted && el.course,
  )

  // start transaction

  const session = await mongoose.startSession()
  try {
    await session.startTransaction()

    await CourseModel.findByIdAndUpdate(id, restPayload, { new: true, session })

    if (preRequisiteCoursesDeleted?.length > 0) {
      await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: preRequisiteCoursesDeleted },
            },
          },
        },
        { new: true, session },
      )
    } else if (preRequisiteCoursesAdded?.length > 0) {
      await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: {
              $each: preRequisiteCoursesAdded,
            },
          },
        },
        { new: true, session },
      )
    }
    await session.commitTransaction()
    await session.endSession()
    return CourseModel.findById(id).populate('preRequisiteCourses.course')
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(501, 'Course not updated')
  }
}

export const GetCourse = async (id: string) => {
  return CourseModel.findById(id).populate('preRequisiteCourses.course')
}

export const DeleteCourse = async (id: string) => {
  return CourseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
}

export const AssignCourseToFaculties = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  const facultyFind = await UFacultyModel.find({
    _id: { $in: payload.faculties },
    isDeleted: false,
  })

  if (facultyFind.length !== payload.faculties!.length) {
    throw new AppError(400, 'One or more faculties not found')
  }
  return await CourseFacultiesModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: {
        faculties: {
          $each: payload.faculties,
        },
      },
    },
    {
      new: true,
      upsert: true,
    },
  )
}

export const RemoveCourseToFaculties = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  return await CourseFacultiesModel.findByIdAndUpdate(
    id,
    {
      $pull: {
        faculties: {
          $in: payload.faculties,
        },
      },
    },
    {
      new: true,
      runValidators: true,
    },
  )
}

export const getFacultiesWithFromDb = async (id: string) => {
  const findCheck = await CourseFacultiesModel.findOne({ course: id })

  if (!findCheck) {
    throw new AppError(400, 'Course not found')
  }
  return await CourseFacultiesModel.findOne({ course: id }).populate(
    'faculties',
  )
}
