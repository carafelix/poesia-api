import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import {
  AuthorFetch,
  AuthorsList,
  BookFetch,
  BooksList,
  PoemsList,
} from "endpoints/lists/lists";
import { PoemCreate, PoemDelete, PoemFetch } from "endpoints/poems/poems";
import { TokenCreate, TokenDelete, TokenList } from "endpoints/users/users";

export const api = OpenAPIRouter({
  docs_url: "/",
  redoc_url: "/redocs",
});

api.get("/token", TokenCreate); // return a list of all poems, query params for limits, lexicographically ordered?
api.delete("/token", TokenDelete); // return a list of all poems, query params for limits, lexicographically ordered?
api.get("/token/all", TokenList); // return a list of all poems, query params for limits, lexicographically ordered?

api.get("/poemas", PoemsList); // return a list of all poems, query params for limits, lexicographically ordered?
api.get("/autores", AuthorsList); // return a list of authors,			 ", 					"
api.get("/libros", BooksList); // return a list of books, 				 ",						"

// api.get("/poema", PoemFetch); // id > autor/libro/nombre > autor/nombre > libro/nombre > nombre. Siempre retorna una lista, de modo que si hay collision, siempre es result[0] o lo q se quiera hacer con ello
// api.post("/poema", PoemCreate); // needs to check book, author, pre-exist etc
// api.delete("/poema/:id", PoemDelete);

// api.get("/:autor", AuthorFetch); // return a list of books with all poems of each books
// api.get("/:autor/:libro", BookFetch); // return all poems from a single book

// 404 for everything else
api.all("*", () =>
  Response.json(
    {
      success: false,
      error: "Route not found",
    },
    { status: 404 },
  ));
