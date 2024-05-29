import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { poem, book, author } from "./dbSchema";
export const insertPoemSchema = createInsertSchema(poem);
export const selectPoemSchema = createSelectSchema(poem);
const _poem = createSelectSchema(poem, {
    author: () => selectAuthorSchema,
    book: () => selectBookSchema
});

export type Poem = Zod.infer<typeof _poem> // should be done in the zod of things

export const selectAuthorSchema = createSelectSchema(author);
export type Author = Zod.infer<typeof selectAuthorSchema>

export const selectBookSchema = createSelectSchema(book);
export type Book = Zod.infer<typeof selectBookSchema>
