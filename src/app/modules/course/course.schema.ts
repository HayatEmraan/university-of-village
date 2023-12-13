import { Schema, model } from 'mongoose'
import { TCourse } from './course.interface'

const preRequisiteCoursesSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
)

const CourseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    prefix: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: Number,
      required: true,
      trim: true,
    },
    credits: {
      type: Number,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

CourseSchema.pre('find', function (next) {
  this.find({ isDeleted: false })
  next()
})

CourseSchema.pre('findOne', function (next) {
  this.find({ isDeleted: false })
  next()
})

export const CourseModel = model<TCourse>('Course', CourseSchema)
