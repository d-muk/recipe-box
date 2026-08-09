import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-divider bg-paper">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl text-primary">
          Recipe Box
        </Link>
        <Link
          href="/recipes/new"
          className="rounded-full bg-primary px-4 py-2 font-body text-sm font-medium text-paper transition-colors hover:bg-[#25392f]"
        >
          Add recipe
        </Link>
      </div>
    </header>
  );
}
