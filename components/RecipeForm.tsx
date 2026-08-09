"use client";

import { useState } from "react";
import type { Recipe, RecipeDraft } from "@/types/recipe";
import { processImageFile } from "@/lib/image";
import { RecipeCardShell } from "@/components/RecipeCardShell";

const MAX_PHOTOS = 3;

function emptyDraft(): RecipeDraft {
  return {
    title: "",
    ingredients: [""],
    instructions: [""],
    prepTimeMinutes: null,
    tags: [],
    isFavorite: false,
    photos: [],
  };
}

function draftFromRecipe(recipe: Recipe): RecipeDraft {
  return {
    title: recipe.title,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    prepTimeMinutes: recipe.prepTimeMinutes,
    tags: recipe.tags,
    isFavorite: recipe.isFavorite,
    photos: recipe.photos,
  };
}

export function RecipeForm({
  mode,
  initialValue,
  onSubmit,
  onCancel,
}: {
  mode: "create" | "edit";
  initialValue?: Recipe;
  onSubmit: (draft: RecipeDraft) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<RecipeDraft>(
    initialValue ? draftFromRecipe(initialValue) : emptyDraft()
  );
  const [tagsInput, setTagsInput] = useState(draft.tags.join(", "));
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);

  const updateListItem = (
    key: "ingredients" | "instructions",
    index: number,
    value: string
  ) => {
    setDraft((prev) => ({
      ...prev,
      [key]: prev[key].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addListItem = (key: "ingredients" | "instructions") => {
    setDraft((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const removeListItem = (key: "ingredients" | "instructions", index: number) => {
    setDraft((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    const remaining = MAX_PHOTOS - draft.photos.length;
    if (remaining <= 0) {
      setPhotoError(`You can add up to ${MAX_PHOTOS} photos.`);
      return;
    }

    setPhotoError(null);
    setIsProcessingPhoto(true);
    try {
      const toProcess = files.slice(0, remaining);
      const processed = await Promise.all(toProcess.map((file) => processImageFile(file)));
      setDraft((prev) => ({ ...prev, photos: [...prev.photos, ...processed] }));
    } catch {
      setPhotoError("Couldn't process that photo.");
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  const removePhoto = (index: number) => {
    setDraft((prev) => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    onSubmit({
      ...draft,
      title: draft.title.trim(),
      ingredients: draft.ingredients.map((i) => i.trim()).filter(Boolean),
      instructions: draft.instructions.map((i) => i.trim()).filter(Boolean),
      tags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <RecipeCardShell className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-utility text-xs text-ink/70">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={draft.title}
            onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
            className="rounded-lg border border-divider bg-paper px-3 py-2 font-display text-xl text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Recipe title"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-utility text-xs text-ink/70">Ingredients</span>
          {draft.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => updateListItem("ingredients", index, e.target.value)}
                className="flex-1 rounded-lg border border-divider bg-paper px-3 py-1.5 font-utility text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="2 cups flour"
              />
              <button
                type="button"
                onClick={() => removeListItem("ingredients", index)}
                aria-label="Remove ingredient"
                className="px-2 text-ink/50 hover:text-ink"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addListItem("ingredients")}
            className="self-start font-utility text-xs text-primary hover:underline"
          >
            + Add ingredient
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-utility text-xs text-ink/70">Instructions</span>
          {draft.instructions.map((step, index) => (
            <div key={index} className="flex gap-2">
              <span className="pt-2 font-utility text-xs text-ink/50">{index + 1}.</span>
              <textarea
                value={step}
                onChange={(e) => updateListItem("instructions", index, e.target.value)}
                rows={2}
                className="flex-1 rounded-lg border border-divider bg-paper px-3 py-1.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Describe this step"
              />
              <button
                type="button"
                onClick={() => removeListItem("instructions", index)}
                aria-label="Remove step"
                className="px-2 text-ink/50 hover:text-ink"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addListItem("instructions")}
            className="self-start font-utility text-xs text-primary hover:underline"
          >
            + Add step
          </button>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="prepTime" className="font-utility text-xs text-ink/70">
              Prep time (minutes)
            </label>
            <input
              id="prepTime"
              type="number"
              min={0}
              value={draft.prepTimeMinutes ?? ""}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  prepTimeMinutes: e.target.value === "" ? null : Number(e.target.value),
                }))
              }
              className="w-32 rounded-lg border border-divider bg-paper px-3 py-2 font-utility text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="15"
            />
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <label htmlFor="tags" className="font-utility text-xs text-ink/70">
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="rounded-lg border border-divider bg-paper px-3 py-2 font-utility text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="dinner, dessert"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 font-body text-sm text-ink">
          <input
            type="checkbox"
            checked={draft.isFavorite}
            onChange={(e) => setDraft((prev) => ({ ...prev, isFavorite: e.target.checked }))}
            className="accent-accent"
          />
          Mark as favorite
        </label>

        <div className="flex flex-col gap-2">
          <span className="font-utility text-xs text-ink/70">Photos</span>
          {draft.photos.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {draft.photos.map((photo, index) => (
                <div key={index} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt=""
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    aria-label="Remove photo"
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-paper"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          {draft.photos.length < MAX_PHOTOS && (
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              disabled={isProcessingPhoto}
              className="font-body text-sm text-ink/70"
            />
          )}
          {isProcessingPhoto && (
            <span className="font-body text-xs text-ink/50">Processing photo…</span>
          )}
          {photoError && <span className="font-body text-xs text-red-700">{photoError}</span>}
        </div>
      </RecipeCardShell>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-2 font-body text-sm font-medium text-paper transition-colors hover:bg-[#25392f]"
        >
          {mode === "create" ? "Save recipe" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-divider px-5 py-2 font-body text-sm font-medium text-ink/70 transition-colors hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
