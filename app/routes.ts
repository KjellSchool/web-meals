import type { RouteConfig } from "@react-router/dev/routes";
import {
    index,
    layout,
    route
} from "@react-router/dev/routes";

export default [
    layout("layouts/sidebar.tsx", [
        index("routes/home.tsx"),
        route("recipes/:recipeId", "routes/recipe.tsx"),
    ]),
] satisfies RouteConfig;