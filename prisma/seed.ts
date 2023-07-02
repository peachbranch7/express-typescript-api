import { db } from '../src/utils/db.server'

type Author = {
  firstName: string
  lastName: string
}

type Book = {
  title: string
  isFiction: boolean
  datePublished: Date
}

async function seed() {
  await Promise.all(
    getAuthors().map((author) =>
      db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      })
    )
  )
  const author = await db.author.findFirst({
    where: { firstName: 'John' },
  })

  await Promise.all(
    getBooks().map((book) =>
      db.book.create({
        data: {
          title: book.title,
          isFiction: book.isFiction,
          datePublished: book.datePublished,
          authorId: author?.id ?? 0,
        },
      })
    )
  )
}

seed()

function getAuthors(): Author[] {
  return [
    {
      firstName: 'John',
      lastName: 'Steinbeck',
    },
    {
      firstName: 'Harper',
      lastName: 'Lee',
    },
    {
      firstName: 'F. Scott',
      lastName: 'Fitzgerald',
    },
  ]
}

function getBooks(): Book[] {
  return [
    {
      title: 'The Grapes of Wrath',
      isFiction: false,
      datePublished: new Date('1939-04-14'),
    },
    {
      title: 'The Pearl',
      isFiction: true,
      datePublished: new Date('1947-01-01'),
    },
    {
      title: 'To Kill a Mockingbird',
      isFiction: true,
      datePublished: new Date('1960-07-11'),
    },
  ]
}
