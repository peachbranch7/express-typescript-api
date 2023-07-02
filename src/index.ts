import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import authorRouter from './api/author/author.router'
import bookRouter from './api/book/book.router'

dotenv.config()

const PORT = process.env.PORT || 8000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/authors', authorRouter)
app.use('/api/books', bookRouter)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
