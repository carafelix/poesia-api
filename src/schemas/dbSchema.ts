import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { Poem } from "./zodSchemas";

export const user = sqliteTable('users', {
  id: text("id").primaryKey(), 
  uploadedPoems: text("uploaded_poems", { mode: "json" }).$type<string[]>(), // reference to the contained poems id's
  createdAt: integer("created_at", { mode: "timestamp_ms" }),
})

export const author = sqliteTable("authores", {
  id: text("id").primaryKey(),

  name: text("name"),
  country: text("country"),
  birthDate: integer("birth_date", { mode: "timestamp" }),
  deathDate: integer("death_date", { mode: "timestamp" }),

  createdAt: integer("created_at", { mode: "timestamp_ms" }),
  lastModifiedAt: integer("last_modified_at", { mode: "timestamp_ms" }),
  lastModifiedBy: integer('last_modified_by').references(() => user.id)

}, (table) => {
  return {
    nameIndex: index("name_idx").on(table.name),
    countryIndex: index("country_idx").on(table.country),
    birthDateIndex: uniqueIndex("birth_date_idx").on(table.birthDate),
  };
});

export const poem = sqliteTable("poems", {
  id: text("id").primaryKey(), 
  canon: integer('canon', { mode: "boolean" }),

  title: text("title").notNull(),
  author: integer("author_id").references(() => author.id).notNull(),
  book: integer("book_id").references(() => book.id),
  content: text("content").notNull(),
  dedicatedTo: text("dedicated_to"),
  quote: text("quote"),

  createdAt: integer("created-at", { mode: "timestamp_ms" }),
  lastModifiedAt: integer("last_modified_at", { mode: "timestamp_ms" }),
  lastModifiedBy: integer('last_modified_by').references(() => user.id)

}, (table) => {
  return {
    titleIndex: index("name_idx").on(table.title),
    bookIndex: index("book_idx").on(table.book),
    authorIndex: index("author_idx").on(table.author),
  };
});

export const book = sqliteTable("books", {
  id: text("id").primaryKey(), 

  title: text("title"),
  author: integer("author_id").references(() => author.id),
  poems: text("poems", { mode: "json" }).$type<Record<number, boolean>>(), // reference to the contained poems id's

  createdAt: integer("created-at", { mode: "timestamp_ms" }),
}, (table) => {
  return {
    titleIndex: index("name_idx").on(table.title),
    authorIndex: index("author_idx").on(table.author),
  };
});

export const poemBackup = sqliteTable("poem_past", {
  id: text("id").primaryKey().references(() => poem.id),
  // should be read-only after first write
  _original: text('original', { mode: 'json' }).$type<Poem>(),
  past: text('past', { mode: 'json' }).$type<Poem>(),
})