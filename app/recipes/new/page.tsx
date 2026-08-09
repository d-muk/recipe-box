"use client";

import { useRouter } from "next/navigation";
import { useRecipes } from "@/lib/recipes-context";
import { RecipeForm } from "@/components/RecipeForm";
import type { RecipeDraft } from "@/types/recipe";

export default function NewRecipePage() {
  const router = useRouter();
  const { addRecipe } = useRecipes();

  const handleSubmit = (draft: RecipeDraft) => {
    const recipe = addRecipe(draft);
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-6 font-display text-3xl text-primary">Add recipe</h1>
      <RecipeForm mode="create" onSubmit={handleSubmit} onCancel={() => router.push("/")} />
    </div>
  );
}
