
## Dev Diary Step
**Prompt:**
I am loosely following this tutorial: https://reactrouter.com/tutorials/address-book#managing-the-history-stack

But instead of contact.tsx, I made a recipe.tsx.

I am working in a team of 3 to make a recipebook, and I need to create the list of recipes from the api: https://www.themealdb.com/api.php

I didn't use the base template specific to the adress book tutorial, but just used the basic template for react, so some basic layouts and such are not in here.

Make the recipe list appear as a sidebar list in my homepage following react router rules and following the tutorial (but personalised to my specific usecase)

**Implementation Details:**
- Replaced default layout in `app/root.tsx` with a split sidebar layout fetching recipes from `https://www.themealdb.com/api/json/v1/1/search.php`.
- Replaced the placeholder address book layout in `app/routes/recipe.tsx` with a bespoke layout to display actual recipes including an image, ingredients list, and instructions fetched dynamically via `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`.
- Updated `app/routes/home.tsx` to provide a default empty state for the content area telling the user to "Select a recipe from the sidebar".

## Dev Diary Step
**Prompt:**
I am loosely following this tutorial: https://reactrouter.com/tutorials/address-book#managing-the-history-stack

But instead of contact.tsx, I made a recipe.tsx.

I am working in a team of 3 to make a recipebook, and I need to create the list of recipes from the api: https://www.themealdb.com/api.php

I didn't use the base template specific to the adress book tutorial, but just used the basic template for react, so some basic layouts and such are not in here.

Make the recipe list appear as a sidebar list in my homepage following react router rules and following the tutorial (but personalised to my specific usecase)

**Implementation Details:**
- Replaced default layout in `app/root.tsx` with a split sidebar layout fetching recipes from `https://www.themealdb.com/api/json/v1/1/search.php`.
- Replaced the placeholder address book layout in `app/routes/recipe.tsx` with a bespoke layout to display actual recipes including an image, ingredients list, and instructions fetched dynamically via `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`.
- Updated `app/routes/home.tsx` to provide a default empty state for the content area telling the user to "Select a recipe from the sidebar".

## Dev Diary Step
**Prompt:**
I added a folder called "react-router-tutorial". Look into the contacts file and make sure it follows the same structure. Don't be creative, make sure everything is really based on that folder, the only difference should be that it is via an api instead and it shows recipes instead. Don't make everything yet, just the recipes list. The loading should be client side and not server side

**Implementation Details:**
- Copied the CSS from the tutorial.
- Created  mimicking the tutorial's sidebar exactly, but querying the API for recipes and using .
- Refactored  to just strictly act as the app shell mimicking the tutorial, moving the sidebar mapping logic into .
- Flattened  and  design strings and IDs to visually match the tutorial boilerplate.

## Dev Diary Step
**Prompt:**
I added a folder called "react-router-tutorial". Look into the contacts file and make sure it follows the same structure. Don't be creative, make sure everything is really based on that folder, the only difference should be that it is via an api instead and it shows recipes instead. Don't make everything yet, just the recipes list. The loading should be client side and not server side

**Implementation Details:**
- Copied the CSS from the tutorial.
- Created app/layouts/sidebar.tsx mimicking the tutorial sidebar exactly, but querying the API for recipes and using clientLoader.
- Refactored app/root.tsx to strictly act as the app shell mimicking the tutorial, moving the sidebar mapping logic into app/layouts/sidebar.tsx.
- Flattened app/routes/recipe.tsx and app/routes/home.tsx design strings and IDs to visually match the tutorial boilerplate.
