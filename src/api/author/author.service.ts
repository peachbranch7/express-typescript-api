import { db } from '../../utils/db.server'

export type Author = {
  id: number
  firstName: string
  lastName: string
  createdAt: Date
}

export const getAuthors = async () => {
  return db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  })
}

export const getAuthorById = async (id: number) => {
  return db.author.findUnique({
    where: {
      id,
    },
  })
}

export const createAuthor = async (author: Omit<Author, 'id'>) => {
  const { firstName, lastName } = author
  return db.author.create({
    data: {
      firstName,
      lastName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  })
}

export const updateAuthor = (author: Omit<Author, 'id'>, id: number) => {
  const { firstName, lastName } = author
  return db.author.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  })
}

export const deleteAuthor = (id: number) => {
  return db.author.delete({
    where: {
      id,
    },
  })
}
