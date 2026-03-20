import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Meals app" },
    { name: "description", content: "Welcome to the meals app" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Welcome to the Recipe Book!</h2>
      <p className="text-lg">👈 Select a recipe from the sidebar to view its details.</p>
      <p className="mt-2">Or use the search bar to find something delicious.</p>
    </div>
  );
}
