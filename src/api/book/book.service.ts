import { db } from '../../utils/db.server'
import { Author } from '../author/author.service'

export type BookRead = {
  id: number
  title: string
  datePublished: Date
  isFiction: boolean
  author: Author
}

export type BookWrite = {
  title: string
  datePublished: Date
  authorId: number
  isFiction: boolean
}

export const getBooks = async () => {
  return db.book.findMany({
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  })
}

export const getBookById = async (id: number) => {
  return db.book.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  })
}

export const createBook = async (book: BookWrite) => {
  const { title, datePublished, isFiction, authorId } = book
  return db.book.create({
    data: {
      title,
      datePublished,
      isFiction,
      authorId,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  })
}

export const updateBook = async (book: BookWrite, id: number) => {
  const { title, datePublished, isFiction, authorId } = book
  return db.book.update({
    where: {
      id,
    },
    data: {
      title,
      datePublished,
      isFiction,
      authorId,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
    },
  })
}

export const deleteBook = async (id: number) => {
  return db.book.delete({
    where: {
      id,
    },
  })
}
