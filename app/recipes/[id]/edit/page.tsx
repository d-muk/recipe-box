"use client";

import { useParams, useRouter } from "next/navigation";
import { useRecipes } from "@/lib/recipes-context";
import { RecipeForm } from "@/components/RecipeForm";
import { RecipeNotFound } from "@/components/RecipeNotFound";
import type { RecipeDraft } from "@/types/recipe";

export default function EditRecipePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getRecipe, updateRecipe, isLoaded } = useRecipes();

  if (!isLoaded) return null;

  const recipe = getRecipe(params.id);

  if (!recipe) {
    return <RecipeNotFound />;
  }

  const handleSubmit = (draft: RecipeDraft) => {
    updateRecipe(recipe.id, draft);
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-6 font-display text-3xl text-primary">Edit recipe</h1>
      <RecipeForm
        mode="edit"
        initialValue={recipe}
        onSubmit={handleSubmit}
        onCancel={() => router.push(`/recipes/${recipe.id}`)}
      />
    </div>
  );
}
