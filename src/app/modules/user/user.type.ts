/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export type TUser = {
  id: string
  email: string
  password: string
  needsPasswordChange: boolean
  role: 'student' | 'admin' | 'faculty'
  status: 'active' | 'blocked'
  isDeleted: boolean
  lastPasswordChangedAt?: Date
}

export interface IUserIn extends Model<TUser> {
  isUserExit(id: string): Promise<TUser | null>
  isPasswordMatch(plainText: string, hashPassword: string): Promise<boolean>
  isTokenALive(issueAt: number, changedAt: Date): void
}
