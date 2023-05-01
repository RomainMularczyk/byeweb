import prisma from '../database';
import DatabaseError from '../errors/database.error';
import DataFormatError from '../errors/dataformat.error';
import { Book } from '../types/Book';

export class BooksService {
  /**
   * Retrieve all books in the database.
   *
   * @async
   * @throws {DatabaseError} If the database could not respond.
   * @returns {Book[]} List of books.
   */
  static async getBooks(): Promise<Book[]> {
    try {
      const dbResponse = await prisma.book.findMany({
        include: { authors: true },
      });
      console.log(dbResponse);
      return dbResponse;
    } catch (err) {
      throw new DatabaseError();
    }
  }

  /**
   * Store a new book in the database.
   *
   * @async
   * @param {Book} body - Book provided by the user.
   * @throws {DatabaseError | DataFormatError} If the data format could not be
   * validated or if the database could not respond.
   * @returns {Book} The created book.
   */
  static async postBook(body: Book): Promise<Book> {
    try {
      const book = {
        ...body,
        publicationDate: new Date(body.publicationDate),
        authors: {
          create: body.authors,
        },
      };
      try {
        const dbResponse = await prisma.book.create({
          data: book,
          include: {
            authors: true,
          },
        });
        return dbResponse;
      } catch (err) {
        throw new DatabaseError();
      }
    } catch (err) {
      throw new DataFormatError();
    }
  }
}
