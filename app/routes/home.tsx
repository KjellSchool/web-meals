import type { Route } from "./+types/home";
import { Link } from "react-router";
import appStylesHref from "../app.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Meals app" },
    { name: "description", content: "Welcome to the meals app" },
  ];
}

export async function loader() {
  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await response.json();
    return { recipeOfTheDay: data.meals?.[0] ?? null };
  } catch {
    return { recipeOfTheDay: null };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { recipeOfTheDay } = loaderData;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Welcome to the Recipe Book!</h2>
      <p className="text-lg">👈 Select a recipe from the sidebar to view its details.</p>
      <p className="mt-2">Or use the search bar to find something delicious.</p>

      {recipeOfTheDay && (
        <div className="mt-8 max-w-md w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-left">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">🍽️ Recipe of the Day</p>
          <img
            src={recipeOfTheDay.strMealThumb}
            alt={recipeOfTheDay.strMeal}
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{recipeOfTheDay.strMeal}</h3>
          <Link
            to={`recipes/${recipeOfTheDay.idMeal}`}
            className="inline-block text-blue-600 hover:underline"
          >
            View recipe
          </Link>
        </div>
      )}
    </div>
  );
}



