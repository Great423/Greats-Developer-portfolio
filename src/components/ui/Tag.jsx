/* eslint-disable react/prop-types */
/** Technology or keyword chip. Renders as a list item inside TagList. */
export function Tag({ children, size = "md" }) {
  const sizes = {
    sm: "px-2.5 py-1 text-[10px]",
    md: "px-3 py-1.5 text-[10.5px]",
  };
  return (
    <li
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] font-primary uppercase tracking-[0.12em] text-white/70 transition-colors duration-300 hover:border-white/25 hover:text-white ${sizes[size]}`}
    >
      {children}
    </li>
  );
}

export function TagList({ tags = [], size = "md", label, className = "" }) {
  if (!tags.length) return null;
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Tag key={tag} size={size}>
          {tag}
        </Tag>
      ))}
    </ul>
  );
}
