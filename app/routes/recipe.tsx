import { Form, useFetcher } from "react-router";
import type { Route } from "./+types/recipe";
import { getRecipe } from "../data";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const recipe = await getRecipe(params.recipeId);

    if (!recipe) {
        throw new Response("Not Found", { status: 404 });
    }

    return { recipe };
}

export default function Recipe({
    loaderData,
}: Route.ComponentProps) {
    const { recipe } = loaderData;

    return (
        <div id="recipe">
            <div>
                <img
                    alt={`${recipe.strMeal} avatar`}
                    key={recipe.strMealThumb}
                    src={recipe.strMealThumb}
                />
            </div>

            <div>
                <h1>
                    {recipe.strMeal ? (
                        <>
                            {recipe.strMeal}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}
                    <Favorite recipe={recipe} />
                </h1>

                {recipe.strCategory ? (
                    <p>
                        <a
                            href={`https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipe.strCategory}`}
                        >
                            {recipe.strCategory}
                        </a>
                    </p>
                ) : null}

                {recipe.strInstructions ? <p>{recipe.strInstructions}</p> : null}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
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
                        <button type="submit">Delete</button>
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
    const fetcher = useFetcher();
    // In a real app, you would check favorite status from the API. We'll default to false.
    const favorite = fetcher.formData
        ? fetcher.formData.get("favorite") === "true"
        : false;

    return (
        <fetcher.Form method="post">
            <button
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
                name="favorite"
                value={favorite ? "false" : "true"}
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}
