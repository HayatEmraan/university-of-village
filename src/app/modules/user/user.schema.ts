import { Schema, model } from 'mongoose'
import { IUserIn, TUser } from './user.type'
import bcrypt from 'bcrypt'
import { bcryptSaltRounds } from '../../config'
import AppError from '../../errors/appError'

export const userSchema = new Schema<TUser, IUserIn>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true, select: false },
    needsPasswordChange: { type: Boolean, required: true, default: true },
    role: {
      type: String,
      enum: ['student', 'admin', 'faculty'],
      required: true,
      default: 'student',
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      required: true,
      default: 'active',
    },
    isDeleted: { type: Boolean, required: true, default: false },
    lastPasswordChangedAt: {
      type: Date
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(bcryptSaltRounds))
  next()
})

userSchema.statics.isUserExit = async function (id: string) {
  const user = await userModel
    .findOne({
      $and: [
        {
          id: id,
        },
        {
          isDeleted: false,
        },
      ],
    })
    .select('+password')
  if (!user) {
    throw new AppError(404, 'User not found')
  }

  if (user.status === 'blocked') {
    throw new AppError(404, 'User is blocked')
  }

  return user
}

userSchema.statics.isPasswordMatch = async function (
  plainText: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainText, hashPassword)
}

export const userModel = model<TUser, IUserIn>('user', userSchema)
