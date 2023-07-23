import prisma from '../database'
import DatabaseError from '../errors/database.error'
import DataFormatError from '../errors/dataformat.error'
import type { Book, BookWithAuthorsAndCategories } from '../types/Book'

export class BooksService {
  /**
   * Retrieve all books in the database.
   *
   * @async
   * @throws {DatabaseError} If the database could not respond.
   * @returns {Book[]} List of books.
   */
  static async getBooks(): Promise<BookWithAuthorsAndCategories> {
    try {
      const dbResponse = await prisma.book.findMany({
        include: { authors: true, category: true },
      })
      return dbResponse
    } catch (err) {
      throw new DatabaseError()
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
  static async postBook(body: Book): Promise<BookWithAuthorsAndCategories> {
    const existingBook = await prisma.book.findFirst({
      where: { isbn: body.isbn },
    })

    if (existingBook) {
      throw new DatabaseError('This book already exist in the database.')
    } else {
      const book = {
        ...body,
        publicationDate: new Date(body.publicationDate),
        authors: {
          create: body.authors,
        },
      }

      try {
        const dbResponse = await prisma.book.create({
          data: book,
          include: {
            authors: true,
            category: true,
          },
        })
        return dbResponse
      } catch (err) {
        throw new DatabaseError()
      }
    }
  }
}
