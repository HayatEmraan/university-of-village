import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AcademicRoutes } from '../modules/academicSemester/academic.route'
import { FacultyRoutes } from '../modules/academicFaculty/faculty.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic',
    route: AcademicRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
