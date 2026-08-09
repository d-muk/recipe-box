"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useRecipes } from "@/lib/recipes-context";
import { RecipeForm } from "@/components/RecipeForm";
import { RecipeCardShell } from "@/components/RecipeCardShell";
import type { RecipeDraft } from "@/types/recipe";

export default function EditRecipePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getRecipe, updateRecipe, isLoaded } = useRecipes();

  if (!isLoaded) return null;

  const recipe = getRecipe(params.id);

  if (!recipe) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-8">
        <RecipeCardShell className="p-6">
          <p className="font-body text-ink/70">Recipe not found.</p>
          <Link href="/" className="mt-2 inline-block font-body text-sm text-primary hover:underline">
            Back to your box
          </Link>
        </RecipeCardShell>
      </div>
    );
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
