import { Types } from 'mongoose'

type TPreRequisiteCourse = {
  course: Types.ObjectId
  isDeleted: boolean
}

export type TCourse = {
  title: string
  prefix: string
  code: number
  credits: number
  isDeleted: boolean
  preRequisiteCourses: Array<TPreRequisiteCourse>
}

export type TCourseFaculties = {
  course: Types.ObjectId
  faculties: [Types.ObjectId]
}
