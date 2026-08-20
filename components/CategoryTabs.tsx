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
    `shrink-0 [clip-path:polygon(14%_0,86%_0,100%_100%,0%_100%)] px-5 pb-2 pt-3 font-utility text-xs uppercase tracking-wider transition-colors ${
      isActive(filter)
        ? "bg-primary text-paper"
        : "bg-divider/25 text-ink/60 hover:bg-divider/45 hover:text-ink"
    }`;

  return (
    <div className="flex gap-1 overflow-x-auto border-b-2 border-divider">
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
