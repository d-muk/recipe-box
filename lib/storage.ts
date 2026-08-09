import type { Recipe } from "@/types/recipe";

const STORAGE_KEY = "recipe-box:recipes";
const STORAGE_VERSION = 1;

interface StorageEnvelope {
  version: number;
  recipes: Recipe[];
}

export class StorageQuotaError extends Error {
  constructor() {
    super("Couldn't save — try removing a photo.");
    this.name = "StorageQuotaError";
  }
}

function isRecipeArray(value: unknown): value is Recipe[] {
  return Array.isArray(value);
}

export function loadRecipes(): Recipe[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as StorageEnvelope;
    if (!isRecipeArray(parsed.recipes)) return [];

    return parsed.recipes;
  } catch (error) {
    console.warn("Failed to load recipes from localStorage:", error);
    return [];
  }
}

export function saveRecipes(recipes: Recipe[]): void {
  const envelope: StorageEnvelope = { version: STORAGE_VERSION, recipes };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      throw new StorageQuotaError();
    }
    throw error;
  }
}
