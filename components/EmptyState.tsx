import Link from "next/link";

export function EmptyState({ variant }: { variant: "empty-box" | "no-matches" }) {
  if (variant === "no-matches") {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <p className="font-body text-ink/70">No recipes match.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="font-body text-lg text-ink/70">
        Your box is empty — add your first recipe.
      </p>
      <Link
        href="/recipes/new"
        className="rounded-full bg-primary px-5 py-2 font-body text-sm font-medium text-paper transition-colors hover:bg-[#25392f]"
      >
        Add recipe
      </Link>
    </div>
  );
}
