import {
  Form,
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";

  // Fetch from themealdb search API
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
  const data = await res.json();

  return { recipes: data.meals || [], q };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { recipes, q } = loaderData;

  return (
    <div className="flex h-screen w-full font-sans text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 bg-gray-50 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center gap-2">
          <Form id="search-form" role="search" className="flex-1">
            <input
              id="q"
              aria-label="Search recipes"
              placeholder="Search recipes..."
              type="search"
              name="q"
              defaultValue={q}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800"
            />
          </Form>
        </div>

        <nav className="flex-1 overflow-auto p-4">
          {recipes.length ? (
            <ul className="space-y-1">
              {recipes.map((recipe: any) => (
                <li key={recipe.idMeal}>
                  <NavLink
                    to={`recipes/${recipe.idMeal}`}
                    className={({ isActive, isPending }) =>
                      `block px-3 py-2 rounded-md transition-colors ${isActive
                        ? "bg-blue-600 text-white"
                        : isPending
                          ? "bg-blue-100 dark:bg-blue-900"
                          : "hover:bg-gray-200 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    {recipe.strMeal}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No recipes found</p>
          )}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto bg-white dark:bg-gray-950 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
