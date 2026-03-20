////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with React Router, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type RecipeMutation = {
    idMeal?: string;
    strMeal?: string;
    strCategory?: string;
    strMealThumb?: string;
    strInstructions?: string;
    twitter?: string;
    notes?: string;
    favorite?: boolean;
};

export type RecipeRecord = RecipeMutation & {
    idMeal: string;
    createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. We'll populate it with API data and local data.
const fakeRecipes = {
    records: {} as Record<string, RecipeRecord>,
    initialized: false,

    async init() {
        if (this.initialized) return;
        // Initial fetch from API to seed our mock database
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
            const data = await res.json();
            if (data.meals) {
                data.meals.forEach((meal: any) => {
                    this.records[meal.idMeal] = {
                        ...meal,
                        createdAt: new Date().toISOString(),
                    };
                });
            }
        } catch (e) {
            console.error("Failed to seed from API", e);
        }
        this.initialized = true;
    },

    async getAll(): Promise<RecipeRecord[]> {
        await this.init();
        return Object.keys(fakeRecipes.records)
            .map((key) => fakeRecipes.records[key])
            .sort(sortBy("-createdAt", "strMeal"));
    },

    async get(idMeal: string): Promise<RecipeRecord | null> {
        await this.init();
        if (!fakeRecipes.records[idMeal]) {
            // Fallback to API if not in fake DB
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            const data = await res.json();
            if (data.meals && data.meals[0]) {
                const recipe = { ...data.meals[0], createdAt: new Date().toISOString() };
                fakeRecipes.records[idMeal] = recipe;
                return recipe;
            }
        }
        return fakeRecipes.records[idMeal] || null;
    },

    async create(values: RecipeMutation): Promise<RecipeRecord> {
        await this.init();
        const idMeal = values.idMeal || Math.random().toString(36).substring(2, 9);
        const createdAt = new Date().toISOString();
        const newRecipe = { idMeal, createdAt, ...values };
        fakeRecipes.records[idMeal] = newRecipe;
        return newRecipe;
    },

    async set(idMeal: string, values: RecipeMutation): Promise<RecipeRecord> {
        await this.init();
        const recipe = await fakeRecipes.get(idMeal);
        invariant(recipe, `No recipe found for ${idMeal}`);
        const updatedRecipe = { ...recipe, ...values };
        fakeRecipes.records[idMeal] = updatedRecipe;
        return updatedRecipe;
    },

    destroy(idMeal: string): null {
        delete fakeRecipes.records[idMeal];
        return null;
    },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getRecipes(query?: string | null): Promise<RecipeRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    await fakeRecipes.init();

    // If we have a query, fetch from API directly to get real search results
    if (query) {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await res.json();
        let apiRecipes = data.meals || [];
        // Combine API results with local modifications. 
        // For simplicity, we just return the API results.
        return apiRecipes;
    }

    let recipes = await fakeRecipes.getAll();
    return recipes.sort(sortBy("strMeal", "createdAt"));
}

export async function createEmptyRecipe() {
    const recipe = await fakeRecipes.create({});
    return recipe;
}

export async function getRecipe(idMeal: string) {
    return fakeRecipes.get(idMeal);
}

export async function updateRecipe(idMeal: string, updates: RecipeMutation) {
    const recipe = await fakeRecipes.get(idMeal);
    if (!recipe) {
        throw new Error(`No recipe found for ${idMeal}`);
    }
    await fakeRecipes.set(idMeal, { ...recipe, ...updates });
    return recipe;
}

export async function deleteRecipe(idMeal: string) {
    fakeRecipes.destroy(idMeal);
}