import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { PoemasList, LibrosList, AutoresList, LibroFetch, AutorFetch } from "endpoints/listas/listas";
import { PoemaCreate, PoemaDelete, PoemaFetch  } from "endpoints/poemas/poemas";

export const router = OpenAPIRouter({
	docs_url: "/",
	redoc_url: "/redocs"
})

router.get("/poemas/", PoemasList); // return a list of all poems, query params for limits, lexicographically ordered?
router.get("/autores/", AutoresList); // return a list of authors,			 ", 					"
router.get("/libros/", LibrosList); // return a list of books, 				 ",						"

router.get("/poema/", PoemaFetch); // id > autor/libro/nombre > autor/nombre > libro/nombre > nombre. Siempre retorna una lista, de modo que si hay collision, siempre es result[0] o lo q se quiera hacer con ello
router.post("/poema/", PoemaCreate); // needs to check book, author, pre-exist etc
router.delete("/poema/:id", PoemaDelete);

router.get("/:autor", AutorFetch); // return a list of books with all poems of each books
router.get("/:autor/:libro", LibroFetch); // return all poems from a single book


// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

export default {
	async fetch(request: Request, env: Env) {
		const { success } = await env.RATE_LIMITER.limit({ key: '/*' })
		if (!success) {
			return new Response(`429 Failure: Too many Request's. Try again later.`, { status: 429 })
		}
		return await router.handle(request,env)
	}
};

interface Env {
	POEMAS_DB: D1Database,
	RATE_LIMITER: any
}
