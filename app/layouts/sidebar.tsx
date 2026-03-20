import {
  Form,
  Link,
  NavLink,
  Outlet,
  useNavigation,
  useSubmit,
} from "react-router";
import { getRecipes } from "../data";
import type { Route } from "./+types/sidebar";
import { useEffect } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const recipes = await getRecipes(q);
  return { recipes, q };
}

export default function SidebarLoader({ loaderData }: Route.ComponentProps) {
  const { recipes, q } = loaderData;
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchField = document.querySelector("q");

    if(searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>
          <Link to="about">React Router Contacts</Link>
        </h1>
        <div>
          <Form id="search-form" onChange="" action="." role="search">
            <input
              aria-label="Search contacts"
              id="q"
              className=""
              defaultValue=""
              name="q"
              placeholder="Search"
              type="search"
            />
            <div aria-hidden hidden="" id="search-spinner" />
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav></nav>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
