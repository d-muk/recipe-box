"use client";

import { createContext, useContext, useCallback, useMemo, useSyncExternalStore } from "react";
import type { Recipe, RecipeDraft, RecipeId } from "@/types/recipe";
import { loadRecipes, saveRecipes } from "@/lib/storage";

let cachedRecipes: Recipe[] | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): Recipe[] | null {
  if (cachedRecipes === null && typeof window !== "undefined") {
    cachedRecipes = loadRecipes();
  }
  return cachedRecipes;
}

function getServerSnapshot(): Recipe[] | null {
  return null;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function commit(next: Recipe[]) {
  cachedRecipes = next;
  saveRecipes(next);
  listeners.forEach((listener) => listener());
}

interface RecipesContextValue {
  recipes: Recipe[];
  isLoaded: boolean;
  addRecipe: (draft: RecipeDraft) => Recipe;
  updateRecipe: (id: RecipeId, patch: Partial<RecipeDraft>) => void;
  deleteRecipe: (id: RecipeId) => void;
  toggleFavorite: (id: RecipeId) => void;
  getRecipe: (id: RecipeId) => Recipe | undefined;
}

const RecipesContext = createContext<RecipesContextValue | null>(null);

export function RecipesProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const recipes = useMemo(() => snapshot ?? [], [snapshot]);
  const isLoaded = snapshot !== null;

  const addRecipe = useCallback((draft: RecipeDraft): Recipe => {
    const now = new Date().toISOString();
    const recipe: Recipe = {
      ...draft,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    commit([...(cachedRecipes ?? []), recipe]);
    return recipe;
  }, []);

  const updateRecipe = useCallback((id: RecipeId, patch: Partial<RecipeDraft>) => {
    const next = (cachedRecipes ?? []).map((recipe) =>
      recipe.id === id
        ? { ...recipe, ...patch, updatedAt: new Date().toISOString() }
        : recipe
    );
    commit(next);
  }, []);

  const deleteRecipe = useCallback((id: RecipeId) => {
    commit((cachedRecipes ?? []).filter((recipe) => recipe.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: RecipeId) => {
    const next = (cachedRecipes ?? []).map((recipe) =>
      recipe.id === id
        ? { ...recipe, isFavorite: !recipe.isFavorite, updatedAt: new Date().toISOString() }
        : recipe
    );
    commit(next);
  }, []);

  const getRecipe = useCallback(
    (id: RecipeId) => recipes.find((recipe) => recipe.id === id),
    [recipes]
  );

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        isLoaded,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        toggleFavorite,
        getRecipe,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes(): RecipesContextValue {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }
  return context;
}
