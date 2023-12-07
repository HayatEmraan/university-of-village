import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AcademicRoutes } from '../modules/academicSemester/academic.route'
import { FacultyRoutes } from '../modules/academicFaculty/faculty.route'
import { DepartmentRoutes } from '../modules/academicDepartment/department.route'
import { StudentRoutes } from '../modules/student/student.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic',
    route: AcademicRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/department',
    route: DepartmentRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
