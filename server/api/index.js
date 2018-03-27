import { Router } from 'express'

import users from './users'
import doctor from './doctor'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(doctor)

export default router
