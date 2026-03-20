import { Form, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/recipe";

export async function loader({ params }: Route.LoaderArgs) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.recipeId}`);
    const data = await res.json();

    if (!data.meals || data.meals.length === 0) {
        throw new Response("Not Found", { status: 404 });
    }

    return { recipe: data.meals[0] };
}

export default function Recipe({ loaderData }: Route.ComponentProps) {
    const { recipe } = loaderData;

    // Extract ingredients and measures
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${measure} ${ingredient}`.trim());
        }
    }

    return (
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
                <img
                    alt={recipe.strMeal}
                    src={recipe.strMealThumb}
                    className="w-full rounded-2xl shadow-lg object-cover"
                />
            </div>

            <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-4">
                    {recipe.strMeal}
                    <Favorite recipe={recipe} />
                </h1>

                <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {recipe.strCategory && <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{recipe.strCategory}</span>}
                    {recipe.strArea && <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{recipe.strArea}</span>}
                </div>

                {recipe.strYoutube && (
                    <p className="mb-6">
                        <a
                            href={recipe.strYoutube}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Watch on YouTube
                        </a>
                    </p>
                )}

                <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
                <ul className="list-disc pl-5 mb-6 space-y-1">
                    {ingredients.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>

                <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    {recipe.strInstructions.split('\n').filter(Boolean).map((paragraph: string, i: number) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </div>

                <div className="mt-8 flex gap-4 border-t border-gray-200 dark:border-gray-800 pt-6">
                    <Form action="edit">
                        <button type="submit" className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm font-medium transition-colors">
                            Edit
                        </button>
                    </Form>

                    <Form
                        action="destroy"
                        method="post"
                        onSubmit={(event) => {
                            const response = confirm(
                                "Please confirm you want to delete this record.",
                            );
                            if (!response) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit" className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded text-sm font-medium transition-colors">
                            Delete
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favorite({
    recipe,
}: {
    recipe: any;
}) {
    // Just a stub for the favorite button based on the tutorial
    const favorite = false;

    return (
        <Form method="post">
            <button
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
                name="favorite"
                value={favorite ? "false" : "true"}
                className="text-2xl hover:scale-110 transition-transform focus:outline-none"
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    if (isRouteErrorResponse(error) && error.status === 404) {
        return <div className="text-xl text-red-500">Recipe not found</div>;
    }
    return <div className="text-xl text-red-500">Something went wrong finding this recipe.</div>;
}
