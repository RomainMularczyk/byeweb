import express from 'express';
import { BooksController } from '../controllers/books.controller';

const router = express.Router();

router.get('/', BooksController.getBooks);
router.post('/', BooksController.postBook);

export default router;
