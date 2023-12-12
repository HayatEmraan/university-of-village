import express from 'express'
import { CreateFaculty, CreateStudent } from './user.controller'

export const UserRoutes = express.Router()

UserRoutes.post('/create-student', CreateStudent)

UserRoutes.post('/create-faculty', CreateFaculty)
