import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { authors, books, poems } from './drizzle/schema'
import z from 'zod'

// Poems

export const insertPoemSchema = createInsertSchema(poems)
export const PoemSchema = createSelectSchema(poems)

// Authors

export const createAuthorSchema = createInsertSchema(authors)
export const AuthorSchema = createSelectSchema(authors)
export const AuthorsArr = z.array(AuthorSchema)
export type Author = z.TypeOf<typeof AuthorSchema>

// Books
export const createBookSchema = createInsertSchema(books)
export const BookSchema = createSelectSchema(books)
export type Book = z.TypeOf<typeof BookSchema>


// Response Schemas

export const PoemResponseSchema = z.object({
    poemTitle: z.string(),
    poemSubindex: z.number(),
    poemText: z.string(),
    bookTitle: z.string(),
    authorName: z.string()
})