import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/appError'
import { departmentModel } from '../academicDepartment/department.schema'
import { facultyModel } from '../academicFaculty/faculty.schema'
import { CourseModel } from '../course/course.schema'
import { UFacultyModel } from '../faculty/uFaculty.schema'
import { SemesterRegistrationModel } from '../semesterRegistration/semester.schema'
import { OfferedCourseModel } from './offered.schema'
import { TOfferedCourse } from './offered.type'

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

  return await OfferedCourseModel.create({
    ...payload,
    academicSemester: isSemesterRegistrationExit.academicSemester,
  })
}

const getAllOfferedCourse = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(
    OfferedCourseModel.find().populate('semesterRegistration'),
    query,
  )
    .filter()
    .sort()
    .select()
    .paginate()

  return await result.modelQuery
}

const getOfferedCourse = async (id: string) => {
  return await OfferedCourseModel.findById(id)
}

const updateOfferedCourse = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  return await OfferedCourseModel.findByIdAndUpdate(id, payload, { new: true })
}

export const OfferedCourseService = {
  createOfferedCourse,
  getAllOfferedCourse,
  getOfferedCourse,
  updateOfferedCourse,
}
