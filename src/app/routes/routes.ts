import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AcademicRoutes } from '../modules/academicSemester/academic.route'
import { FacultyRoutes } from '../modules/academicFaculty/faculty.route'
import { DepartmentRoutes } from '../modules/academicDepartment/department.route'
import { StudentRoutes } from '../modules/student/student.route'
import { UFacultyRoutes } from '../modules/faculty/uFaculty.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { CourseRoutes } from '../modules/course/course.route'
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semester.routes'
import { OfferedRoutes } from '../modules/offeredCourse/offered.routes'
import { AuthRoutes } from '../modules/auth/auth.routes'
import { EnrolledRoutes } from '../modules/enrolledCourse/enrolled.routes'

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
  {
    path: '/faculties',
    route: UFacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registration',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-course',
    route: OfferedRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/enrolled',
    route: EnrolledRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
