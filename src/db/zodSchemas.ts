// import { createInsertSchema, createSelectSchema } from "drizzle-zod";
// import { apiUserTable, AuthorTable, BookTable, PoemTable } from "./dbSchema";
// import z from "zod";

// export const dummy = createSelectSchema(apiUserTable);

// // Poems

// export const insertPoemSchema = createInsertSchema(PoemTable);
// export const selectPoemSchema = createSelectSchema(PoemTable);
// const _poem = createSelectSchema(PoemTable, {
//   author: () => AuthorSchema,
//   book: () => selectBookSchema,
// });

// export type Poem = Zod.infer<typeof _poem>; // should be done in the zod of things

// // Authors

// export const createAuthorSchema = createInsertSchema(AuthorTable, {
//   id: (author) => author.id.optional(),
//   createdAt: (author) => author.createdAt.optional(),
//   lastModifiedAt: (author) => author.lastModifiedAt.optional(),
//   lastModifiedBy: (author) => author.lastModifiedBy.optional(),
// });
// export const AuthorSchema = createSelectSchema(AuthorTable);
// export type Author = Zod.infer<typeof AuthorSchema>;
// export type createAuthor = Zod.infer<typeof createAuthorSchema>;

// // Books
// export const selectBookSchema = createSelectSchema(BookTable);
// export type Book = Zod.infer<typeof selectBookSchema>;
