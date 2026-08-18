"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useRecipes } from "@/lib/recipes-context";
import { RecipeCardShell } from "@/components/RecipeCardShell";
import { RecipeMeta } from "@/components/RecipeMeta";
import { RecipeNotFound } from "@/components/RecipeNotFound";
import { FavoriteStar } from "@/components/FavoriteStar";
import { IngredientChecklist } from "@/components/IngredientChecklist";

export default function RecipeDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getRecipe, isLoaded, toggleFavorite, deleteRecipe } = useRecipes();

  if (!isLoaded) return null;

  const recipe = getRecipe(params.id);

  if (!recipe) {
    return <RecipeNotFound />;
  }

  const handleDelete = () => {
    if (!window.confirm(`Delete "${recipe.title}"? This can't be undone.`)) return;
    deleteRecipe(recipe.id);
    router.push("/");
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-8">
      <RecipeCardShell className="flex flex-col gap-6 p-6">
        {recipe.photos[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={recipe.photos[0]}
            alt=""
            className="h-56 w-full rounded-lg object-cover"
          />
        )}

        <div className="flex items-start justify-between gap-2">
          <h1 className="font-display text-3xl text-primary">{recipe.title}</h1>
          <FavoriteStar isFavorite={recipe.isFavorite} onToggle={() => toggleFavorite(recipe.id)} />
        </div>

        <RecipeMeta prepTimeMinutes={recipe.prepTimeMinutes} tags={recipe.tags} />

        <div>
          <h2 className="mb-2 font-display text-lg text-primary">Ingredients</h2>
          <IngredientChecklist ingredients={recipe.ingredients} />
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg text-primary">Instructions</h2>
          <ol className="flex flex-col gap-3">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex gap-3 font-body text-sm text-ink">
                <span className="font-utility text-ink/50">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </RecipeCardShell>

      <div className="flex gap-3">
        <Link
          href={`/recipes/${recipe.id}/edit`}
          className="rounded-full bg-primary px-5 py-2 font-body text-sm font-medium text-paper transition-colors hover:bg-[#25392f]"
        >
          Edit recipe
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-full border border-divider px-5 py-2 font-body text-sm font-medium text-ink/70 transition-colors hover:text-ink"
        >
          Delete recipe
        </button>
      </div>
    </div>
  );
}
