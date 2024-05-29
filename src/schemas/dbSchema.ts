import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { Poem } from "./zodSchemas";

export const apiUser = sqliteTable("api_user", {
  id: text("id").primaryKey(),
  uploadedPoems: text("uploaded_poems", { mode: "json" }).$type<string[]>(), // reference to the contained poems id's
});

export const author = sqliteTable("authores", {
  id: text("id").primaryKey(),

  name: text("name"),
  country: text("country"),
  birthDate: integer("birth_date", { mode: "timestamp" }),
  deathDate: integer("death_date", { mode: "timestamp" }),

  createdAt: integer("created_at", { mode: "timestamp_ms" }),
  createdBy: integer("created_by", { mode: "timestamp_ms" }),
  lastModifiedAt: integer("last_modified_at", { mode: "timestamp_ms" }),
  lastModifiedBy: integer("last_modified_by").references(() => apiUser.id),
}, (table) => {
  return {
    nameIndex: index("name_idx").on(table.name),
    countryIndex: index("country_idx").on(table.country),
    birthDateIndex: uniqueIndex("birth_date_idx").on(table.birthDate),
    createdAtIndex: uniqueIndex("created_at_idx").on(table.createdAt),
  };
});

export const poem = sqliteTable("poems", {
  id: text("id").primaryKey(),
  canon: integer("canon", { mode: "boolean" }),

  title: text("title").notNull(),
  author: integer("author_id").references(() => author.id).notNull(),
  book: integer("book_id").references(() => book.id),
  content: text("content").notNull(),
  dedication: text("dedication"),
  quote: text("quote"),

  createdAt: integer("created_at", { mode: "timestamp_ms" }),
  createdBy: integer("created_by", { mode: "timestamp_ms" }),
  lastModifiedAt: integer("last_modified_at", { mode: "timestamp_ms" }),
  lastModifiedBy: integer("last_modified_by").references(() => apiUser.id),
}, (table) => {
  return {
    titleIndex: index("name_idx").on(table.title),
    bookIndex: index("book_idx").on(table.book),
    authorIndex: index("author_idx").on(table.author),
    createdAtIndex: uniqueIndex("created_at_idx").on(table.createdAt),
  };
});

export const book = sqliteTable("books", {
  id: text("id").primaryKey(),

  title: text("title"),
  author: integer("author_id").references(() => author.id),
  poems: text("poems", { mode: "json" }).$type<Record<number, boolean>>(), // reference to the contained poems id's

  createdAt: integer("created_at", { mode: "timestamp_ms" }),
  createdBy: integer("created_by", { mode: "timestamp_ms" }),
  lastModifiedAt: integer("last_modified_at", { mode: "timestamp_ms" }),
  lastModifiedBy: integer("last_modified_by").references(() => apiUser.id),
}, (table) => {
  return {
    titleIndex: index("name_idx").on(table.title),
    authorIndex: index("author_idx").on(table.author),
    createdAtIndex: uniqueIndex("created_at_idx").on(table.createdAt),
  };
});

export const poemBackup = sqliteTable("poem_past", {
  id: text("id").primaryKey().references(() => poem.id),
  // should be read-only after first write
  _original: text("original", { mode: "json" }).$type<Poem>(),
  past: text("past", { mode: "json" }).$type<Poem>(),
});
