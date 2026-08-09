export function FavoriteStar({
  isFavorite,
  onToggle,
  size = "md",
}: {
  isFavorite: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isFavorite ? "Remove from favorites" : "Mark as favorite"}
      aria-pressed={isFavorite}
      className={`transition-transform hover:scale-110 ${
        size === "sm" ? "text-lg" : "text-2xl"
      } ${isFavorite ? "text-accent" : "text-divider"}`}
    >
      ★
    </button>
  );
}
