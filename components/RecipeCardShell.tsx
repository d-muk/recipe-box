export function RecipeCardShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`recipe-card-shell border border-divider ${className}`}>
      {children}
    </div>
  );
}
