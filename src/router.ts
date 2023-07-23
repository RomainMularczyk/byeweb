import express from 'express'
import booksRouter from './routes/books.route'
import usersRouter from './routes/users.route'

const router = express.Router()

router.use('/books', booksRouter)
router.use('/users', usersRouter)

export default router
