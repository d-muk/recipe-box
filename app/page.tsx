"use client";

import { useMemo, useState } from "react";
import { useRecipes } from "@/lib/recipes-context";
import { RecipeCard } from "@/components/RecipeCard";
import { SearchBar } from "@/components/SearchBar";
import { CategoryTabs, type CategoryFilter } from "@/components/CategoryTabs";
import { EmptyState } from "@/components/EmptyState";

export default function Home() {
  const { recipes, isLoaded, toggleFavorite } = useRecipes();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    recipes.forEach((recipe) => recipe.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    const q = query.trim().toLowerCase();

    return recipes
      .filter((recipe) => {
        if (filter === "favorites" && !recipe.isFavorite) return false;
        if (typeof filter === "object" && !recipe.tags.includes(filter.tag)) return false;

        if (!q) return true;
        const inTitle = recipe.title.toLowerCase().includes(q);
        const inIngredients = recipe.ingredients.some((i) => i.toLowerCase().includes(q));
        return inTitle || inIngredients;
      })
      .sort((a, b) => {
        if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
        return a.title.localeCompare(b.title);
      });
  }, [recipes, filter, query]);

  if (!isLoaded) return null;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-8">
      {recipes.length === 0 ? (
        <EmptyState variant="empty-box" />
      ) : (
        <>
          <SearchBar value={query} onChange={setQuery} />
          <CategoryTabs tags={allTags} active={filter} onSelect={setFilter} />
          {filteredRecipes.length === 0 ? (
            <EmptyState variant="no-matches" />
          ) : (
            <div className="flex flex-col gap-4">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onToggleFavorite={() => toggleFavorite(recipe.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
