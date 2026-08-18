import Link from "next/link";
import { RecipeCardShell } from "@/components/RecipeCardShell";

export function RecipeNotFound() {
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
