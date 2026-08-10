import Link from "next/link";
import type { Recipe } from "@/types/recipe";
import { RecipeCardShell } from "@/components/RecipeCardShell";
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
          <div className="flex flex-wrap items-center gap-2 font-utility text-xs text-ink/70">
            {recipe.prepTimeMinutes !== null && <span>{recipe.prepTimeMinutes} min</span>}
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-divider px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </RecipeCardShell>
    </Link>
  );
}
