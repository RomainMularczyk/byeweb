import express from 'express'
import { UsersController } from '../controllers/users.controller'

const router = express.Router()

router.get('/', UsersController.getUser)
router.post('/', UsersController.loginUser)

export default router
