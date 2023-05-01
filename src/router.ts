import express from 'express';
import booksRouter from './routes/books.route';

const router = express.Router();

router.use('/books', booksRouter);

export default router;
