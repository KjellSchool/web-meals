// import { LoaderFunctionArgs } from "react-router-dom";

export async function getRecipes(): Promise<User[]> {
  const res = await fetch("https://www.themealdb.com/api.php");

  if (!res.ok) {
    throw new Response("Failed to fetch recipes", { status: res.status });
  }

  return res.json();
}
