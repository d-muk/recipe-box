export type RecipeId = string;

export interface Recipe {
  id: RecipeId;
  title: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number | null;
  tags: string[];
  isFavorite: boolean;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}

export type RecipeDraft = Omit<Recipe, "id" | "createdAt" | "updatedAt">;
