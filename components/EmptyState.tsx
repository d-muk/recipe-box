import Link from "next/link";

function EmptyBoxIllustration() {
  return (
    <svg
      width="128"
      height="100"
      viewBox="0 0 128 100"
      fill="none"
      aria-hidden="true"
      className="text-divider"
    >
      <g stroke="currentColor" strokeWidth="1.5">
        <rect
          x="-17"
          y="-31"
          width="34"
          height="24"
          rx="2"
          transform="translate(64 42) rotate(-9)"
          fill="var(--color-paper)"
        />
        <rect
          x="-17"
          y="-33"
          width="34"
          height="24"
          rx="2"
          transform="translate(64 42) rotate(9)"
          fill="var(--color-paper)"
        />
        <rect
          x="-17"
          y="-34"
          width="34"
          height="24"
          rx="2"
          transform="translate(64 42)"
          fill="var(--color-paper)"
          stroke="var(--color-accent)"
        />
      </g>
      <path
        d="M18 46 L30 88 H98 L110 46 Z"
        fill="var(--color-paper)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M18 46 H110" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

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
      <EmptyBoxIllustration />
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
