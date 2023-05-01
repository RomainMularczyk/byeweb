import type { Author } from './Author.d';

export type Book = {
  title: string;
  authors: Author[];
  publisher: string;
  publicationDate: Date;
  language: string;
  pages: number;
  isbn: number;
};
