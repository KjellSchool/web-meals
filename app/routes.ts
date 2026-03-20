import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
    route("recipes/:recipeId", "routes/recipe.tsx"),
    index("routes/home.tsx")] satisfies RouteConfig;
