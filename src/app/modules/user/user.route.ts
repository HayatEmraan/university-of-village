import express from 'express'
import { CreateStudent } from './user.controller'

export const UserRoutes = express.Router()

UserRoutes.post('/create-student', CreateStudent)
