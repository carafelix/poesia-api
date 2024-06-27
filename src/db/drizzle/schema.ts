import {
   bigint,
   boolean,
   foreignKey,
   integer,
   pgTable,
   text,
   timestamp,
   unique,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const authors = pgTable('authors', {
   // You can use { mode: "bigint" } if numbers are exceeding js number limitations
   birth_year: bigint('birth_year', { mode: 'number' }),
   // You can use { mode: "bigint" } if numbers are exceeding js number limitations
   death_year: bigint('death_year', { mode: 'number' }),
   xata_id: text('xata_id').default(
      `('rec_'::text || (xata_private.xid())::text)`,
   ).notNull(),
   xata_version: integer('xata_version').default(0).notNull(),
   xata_createdat: timestamp('xata_createdat', {
      withTimezone: true,
      mode: 'string',
   }).defaultNow().notNull(),
   xata_updatedat: timestamp('xata_updatedat', {
      withTimezone: true,
      mode: 'string',
   }).defaultNow().notNull(),
   name: text('name').notNull(),
   country: text('country').notNull(),
}, (table) => {
   return {
      _pgroll_new_authors_xata_id_key: unique('_pgroll_new_authors_xata_id_key')
         .on(table.xata_id),
      authors_name_unique: unique('authors_name_unique').on(table.name),
   }
})

export const books = pgTable('books', {
   // You can use { mode: "bigint" } if numbers are exceeding js number limitations
   publish_year: bigint('publish_year', { mode: 'number' }),
   xata_version: integer('xata_version').default(0).notNull(),
   xata_createdat: timestamp('xata_createdat', {
      withTimezone: true,
      mode: 'string',
   }).defaultNow().notNull(),
   xata_updatedat: timestamp('xata_updatedat', {
      withTimezone: true,
      mode: 'string',
   }).defaultNow().notNull(),
   xata_id: text('xata_id').default(
      `('rec_'::text || (xata_private.xid())::text)`,
   ).notNull(),
   title: text('title').notNull(),
   google_books_link: text('google_books_link'),
   author: text('author').references(() => authors.xata_id, {
      onDelete: 'set null',
   }),
}, (table) => {
   return {
      _pgroll_new_books_xata_id_key: unique('_pgroll_new_books_xata_id_key').on(
         table.xata_id,
      ),
      books_GB_link_unique: unique('books_GB_link_unique').on(
         table.google_books_link,
      ),
   }
})

export const poems = pgTable('poems', {
   title: text('title'),
   text: text('text'),
   // You can use { mode: "bigint" } if numbers are exceeding js number limitations
   subindex: bigint('subindex', { mode: 'number' }),
   xata_id: text('xata_id').default(
      `('rec_'::text || (xata_private.xid())::text)`,
   ).notNull(),
   xata_version: integer('xata_version').default(0).notNull(),
   xata_createdat: timestamp('xata_createdat', {
      withTimezone: true,
      mode: 'string',
   }).defaultNow().notNull(),
   xata_updatedat: timestamp('xata_updatedat', {
      withTimezone: true,
      mode: 'string',
   }).defaultNow().notNull(),
   canon: boolean('canon').default(false).notNull(),
   no_sibilings: boolean('no_sibilings').default(false),
   // You can use { mode: "bigint" } if numbers are exceeding js number limitations
   length: bigint('length', { mode: 'number' }).notNull(),
   book: text('book').references(() => books.xata_id, { onDelete: 'set null' }),
}, (table) => {
   return {
      _pgroll_new_poems_xata_id_key: unique('_pgroll_new_poems_xata_id_key').on(
         table.xata_id,
      ),
   }
})
