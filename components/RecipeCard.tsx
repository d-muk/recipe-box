import Link from "next/link";
import type { Recipe } from "@/types/recipe";
import { RecipeCardShell } from "@/components/RecipeCardShell";
import { RecipeMeta } from "@/components/RecipeMeta";
import { FavoriteStar } from "@/components/FavoriteStar";

export function RecipeCard({
  recipe,
  onToggleFavorite,
}: {
  recipe: Recipe;
  onToggleFavorite: () => void;
}) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block transition-transform hover:scale-[1.01]">
      <RecipeCardShell className="flex gap-4 py-4 pl-14 pr-6">
        {recipe.photos[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={recipe.photos[0]}
            alt=""
            className="h-20 w-20 shrink-0 rounded-lg object-cover"
          />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="truncate font-display text-xl text-primary">
              {recipe.title}
            </h2>
            <FavoriteStar isFavorite={recipe.isFavorite} onToggle={onToggleFavorite} size="sm" />
          </div>
          <RecipeMeta prepTimeMinutes={recipe.prepTimeMinutes} tags={recipe.tags} />
        </div>
      </RecipeCardShell>
    </Link>
  );
}
