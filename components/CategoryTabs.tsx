export type CategoryFilter = "all" | "favorites" | { tag: string };

export function CategoryTabs({
  tags,
  active,
  onSelect,
}: {
  tags: string[];
  active: CategoryFilter;
  onSelect: (filter: CategoryFilter) => void;
}) {
  const isActive = (filter: CategoryFilter) => {
    if (typeof filter === "string") return filter === active;
    return typeof active === "object" && active.tag === filter.tag;
  };

  const tabClass = (filter: CategoryFilter) =>
    `rounded-t-lg border border-b-0 border-divider px-4 py-2 font-utility text-sm transition-colors ${
      isActive(filter)
        ? "bg-primary text-paper"
        : "bg-paper text-ink/70 hover:text-ink"
    }`;

  return (
    <div className="flex flex-wrap gap-1">
      <button type="button" className={tabClass("all")} onClick={() => onSelect("all")}>
        All
      </button>
      <button
        type="button"
        className={tabClass("favorites")}
        onClick={() => onSelect("favorites")}
      >
        Favorites
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={tabClass({ tag })}
          onClick={() => onSelect({ tag })}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
