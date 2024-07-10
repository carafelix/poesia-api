import { relations } from 'drizzle-orm/relations'
import { authors, books, poems } from './schema'

export const booksRelations = relations(books, ({ one, many }) => ({
    author: one(authors, {
        fields: [books.author],
        references: [authors.xata_id],
    }),
    poems: many(poems),
}))

export const authorsRelations = relations(authors, ({ many }) => ({
    books: many(books),
}))

export const poemsRelations = relations(poems, ({ one }) => ({
    book: one(books, {
        fields: [poems.book],
        references: [books.xata_id],
    }),
}))
