export function RecipeMeta({
  prepTimeMinutes,
  tags,
}: {
  prepTimeMinutes: number | null;
  tags: string[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 font-utility text-xs text-ink/70">
      {prepTimeMinutes !== null && <span>{prepTimeMinutes} min</span>}
      {tags.map((tag) => (
        <span key={tag} className="rounded-full border border-divider px-2 py-0.5">
          {tag}
        </span>
      ))}
    </div>
  );
}
