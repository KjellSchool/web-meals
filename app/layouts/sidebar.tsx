import { Form, Link, NavLink, Outlet, useNavigation, useSubmit, } from "react-router";
import type { Route } from "./+types/sidebar";
import { useEffect, useState } from "react";

export async function clientLoader({
    request,
}: Route.ClientLoaderArgs) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q || ""}`);
    const data = await res.json();
    const recipes = data.meals || [];
    return { recipes, q };
}

export default function SidebarLayout({
    loaderData,
}: Route.ComponentProps) {

    const { recipes, q } = loaderData;
    const navigation = useNavigation();
    const [query, setQuery] = useState(q || "");
    const submit = useSubmit();
    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "q",
        );

    useEffect(() => {
        setQuery(q || "");
    }, [q]);
    return (
        <>
            <div id="sidebar">
                <h1>
                    <Link to="/">Recipe Book</Link>
                </h1>
                <div>
                    <Form id="search-form">
                        <input
                            aria-label="Search recipes"
                            className={searching ? "loading" : ""}
                            defaultValue={q || ""}
                            id="q"
                            name="q"

                            onChange={(event) => {
                                setQuery(event.currentTarget.value);
                                const isFirstSearch = q === null;
                                submit(event.currentTarget, {
                                    replace: !isFirstSearch,
                                });
                            }}
                            role="search"
                            placeholder="Search"
                            type="search"
                            value={query}
                        />
                        <div aria-hidden hidden={!searching} id="search-spinner" />
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {recipes.length ? (
                        <ul>
                            {recipes.map((recipe: any) => (
                                <li key={recipe.idMeal}>
                                    <NavLink
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                        to={`recipes/${recipe.idMeal}`}
                                    >
                                        <Link to={`recipes/${recipe.idMeal}`}>
                                            {recipe.strMeal ? (
                                                <>
                                                    {recipe.strMeal}
                                                </>
                                            ) : (
                                                <i>No Name</i>
                                            )}
                                        </Link>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No recipes</i>
                        </p>
                    )}
                </nav>
            </div>
            <div className={
                navigation.state === "loading" && !searching
                    ? "loading"
                    : ""
            }
                id="detail">
                <Outlet />
            </div>
        </>
    );
}