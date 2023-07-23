import { Prisma } from '@client/prisma'
import type { Author } from './Author.d';

export const bookWithAuthorsAndCategories = Prisma.validator<Prisma.BookArgs>()({
  include: { authors: true, categories: true }
})

export type BookWithAuthorsAndCategories = Prisma.BookGetPayload<typeof bookWithAuthorsAndCategories>

export type Book = {
  title: string;
  authors: Author[];
  publisher: string;
  publicationDate: Date;
  language: string;
  pages: number;
  isbn: string;
  coverImage: string;
  progress?: number;
  category?: Category;
}
