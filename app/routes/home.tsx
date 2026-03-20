import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meals app" },
    { name: "description", content: "Welcome to the meals app" },
  ];
}

export default function Home() {
  return <Welcome />;
}
