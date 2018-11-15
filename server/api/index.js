import { Router } from 'express'

import users from './users'
import app from './app'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(app)

export default router
