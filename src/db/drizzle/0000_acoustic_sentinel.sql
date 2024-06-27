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
	"title" text NOT NULL,
	"author" text DEFAULT 'rec_cpkdr0jru25eev0v25k0',
	"GB_link" text,
	CONSTRAINT "_pgroll_new_books_xata_id_key" UNIQUE("xata_id"),
	CONSTRAINT "books_GB_link_unique" UNIQUE("GB_link")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "poems" (
	"title" text,
	"text" text,
	"subindex" bigint,
	"xata_id" text DEFAULT ('rec_'::text || (xata_private.xid())::text) NOT NULL,
	"xata_version" integer DEFAULT 0 NOT NULL,
	"xata_createdat" timestamp with time zone DEFAULT now() NOT NULL,
	"xata_updatedat" timestamp with time zone DEFAULT now() NOT NULL,
	"canon" boolean DEFAULT false NOT NULL,
	"no_sibilings" boolean DEFAULT false,
	"length" bigint NOT NULL,
	"book" text,
	CONSTRAINT "_pgroll_new_poems_xata_id_key" UNIQUE("xata_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "books" ADD CONSTRAINT "author_link" FOREIGN KEY ("author") REFERENCES "public"."authors"("xata_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "poems" ADD CONSTRAINT "book_link" FOREIGN KEY ("book") REFERENCES "public"."books"("xata_id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;