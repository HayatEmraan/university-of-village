import { Router } from 'express'
import {
  AdminDelete,
  AdminGet,
  AdminUpdate,
  AdminsGet,
} from './admin.controller'

export const AdminRoutes = Router()

AdminRoutes.get('/', AdminsGet)
AdminRoutes.get('/:id', AdminGet)

AdminRoutes.patch('/:id', AdminUpdate)
AdminRoutes.delete('/:id', AdminDelete)
