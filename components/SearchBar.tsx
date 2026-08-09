export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search recipes…"
      aria-label="Search recipes"
      className="w-full rounded-lg border border-divider bg-paper px-4 py-2 font-utility text-sm text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
}
