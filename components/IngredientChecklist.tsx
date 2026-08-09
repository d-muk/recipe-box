"use client";

import { useState } from "react";

export function IngredientChecklist({ ingredients }: { ingredients: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <ul className="flex flex-col gap-2">
      {ingredients.map((ingredient, index) => (
        <li key={index}>
          <label className="flex cursor-pointer items-start gap-2 font-utility text-sm">
            <input
              type="checkbox"
              checked={checked.has(index)}
              onChange={() => toggle(index)}
              className="mt-0.5 accent-primary"
            />
            <span className={checked.has(index) ? "text-ink/40 line-through" : "text-ink"}>
              {ingredient}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
