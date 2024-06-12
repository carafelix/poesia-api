-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "authors" (
	"birth_year" bigint,
	"death_year" bigint,
	"xata_id" text DEFAULT ('rec_'::text || (xata_private.xid())::text) NOT NULL,
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"country" text NOT NULL,
	CONSTRAINT "_pgroll_new_authors_xata_id_key" UNIQUE("xata_id"),
	CONSTRAINT "authors_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "books" (
	"publish_year" bigint,
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_id" text DEFAULT ('rec_'::text || (xata_private.xid())::text) NOT NULL,
	"author_id" text NOT NULL,
	"author_name" text NOT NULL,
	"title" text NOT NULL,
	CONSTRAINT "_pgroll_new_books_xata_id_key" UNIQUE("xata_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "poems" (
	"title" text,
	"text" text,
	"book_title" text,
	"book_id" text,
	"subindex" bigint,
	"xata_id" text DEFAULT ('rec_'::text || (xata_private.xid())::text) NOT NULL,
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "_pgroll_new_poems_xata_id_key" UNIQUE("xata_id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_pgroll_new_authors_xata_id_key" ON "authors" USING btree ("xata_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "authors_name_unique" ON "authors" USING btree ("name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_pgroll_new_books_xata_id_key" ON "books" USING btree ("xata_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_pgroll_new_poems_xata_id_key" ON "poems" USING btree ("xata_id" text_ops);
*/