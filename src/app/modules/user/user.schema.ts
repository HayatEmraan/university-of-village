import { Schema, model } from 'mongoose'
import { TUser } from './user.type'
import bcrypt from 'bcrypt'
import { bcryptSaltRounds } from '../../config'

export const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
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

export const userModel = model<TUser>('user', userSchema)
