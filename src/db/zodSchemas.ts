import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { authors } from "./drizzle/schema";
import z from "zod";

// export const dummy = createSelectSchema(apiUserTable);

// // Poems

// export const insertPoemSchema = createInsertSchema(PoemTable);
// export const selectPoemSchema = createSelectSchema(PoemTable);
// const _poem = createSelectSchema(PoemTable, {
//   author: () => AuthorSchema,
//   book: () => selectBookSchema,
// });

// export type Poem = Zod.infer<typeof _poem>; // should be done in the zod of things

// Authors

export const createAuthorSchema = createInsertSchema(authors);
export const AuthorSchema = createSelectSchema(authors);
export type Author = Zod.infer<typeof AuthorSchema>;
export type createAuthor = Zod.infer<typeof createAuthorSchema>;

// // Books
// export const selectBookSchema = createSelectSchema(BookTable);
// export type Book = Zod.infer<typeof selectBookSchema>;
