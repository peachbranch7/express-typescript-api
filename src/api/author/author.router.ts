import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import * as AuthorService from './author.service'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const authors = await AuthorService.getAuthors()
    return res.status(200).json(authors)
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const author = await AuthorService.getAuthorById(id)
    if (author) {
      return res.status(200).json(author)
    }
    return res.status(404).json(`Author with id ${id} not found`)
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
})

router.post(
  '/',
  body('firstName').isString(),
  body('lastName').isString(),
  async (req: Request<{}, {}, AuthorService.Author>, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const author = req.body
      const newAuthor = await AuthorService.createAuthor(author)
      return res.status(201).json(newAuthor)
    } catch (error: any) {
      return res.status(500).json(error.message)
    }
  }
)

router.put(
  '/:id',
  body('firstName').isString(),
  body('lastName').isString(),
  async (
    req: Request<{ id: string }, {}, AuthorService.Author>,
    res: Response
  ) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const authorId = Number(req.params.id)

    try {
      const author = req.body
      const updatedAuthor = await AuthorService.updateAuthor(author, authorId)
      return res.status(201).json(updatedAuthor)
    } catch (error: any) {
      return res.status(500).json(error.message)
    }
  }
)

router.delete('/:id', async (req: Request, res: Response) => {
  const authorId = Number(req.params.id)

  try {
    await AuthorService.deleteAuthor(authorId)
    return res.status(204).json('Author deleted')
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
})

export default router
