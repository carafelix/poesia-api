import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { authors, books, poems } from "./drizzle/schema";

// Poems

export const insertPoemSchema = createInsertSchema(poems);
export const PoemSchema = createSelectSchema(poems);

// Authors

export const createAuthorSchema = createInsertSchema(authors);
export const AuthorSchema = createSelectSchema(authors);

// Books
export const createBookSchema = createInsertSchema(books);
export const BookSchema = createSelectSchema(books);
