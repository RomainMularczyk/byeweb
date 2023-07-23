import express from 'express'
import { BooksController } from '../controllers/books.controller'
import { UsersController } from '../controllers/users.controller'
import { UsersMiddleware } from '../middlewares/users.middleware'

const router = express.Router()

router.get('/', BooksController.getBooks)
router.post('/', UsersMiddleware.isUserAuthenticated, BooksController.postBook)

export default router
