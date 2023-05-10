/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express';
import { BooksService } from '../services/books.service';

export class BooksController {
  static async getBooks(req: Request, res: Response) {
    try {
      const books = await BooksService.getBooks();
      return res.status(200).json({
        status: 200,
        data: books,
      });
    } catch (err: any) {
      return res.status(404).json({
        status: 403,
        message: err.message,
      });
    }
  }

  static async postBook(req: Request, res: Response) {
    try {
      const book = await BooksService.postBook(req.body);
      return res.status(201).json({
        status: 201,
        data: book,
      });
    } catch (err: any) {
      return res.status(404).json({
        status: 404,
        message: err.message,
      });
    }
  }
}
