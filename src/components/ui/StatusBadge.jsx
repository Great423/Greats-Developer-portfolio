/* eslint-disable react/prop-types */
/** "Live" for projects with a public site, otherwise the project's own status. */
export default function StatusBadge({ project, className = "" }) {
  const live = Boolean(project.liveUrl);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-primary text-[10px] font-medium uppercase tracking-[0.16em] backdrop-blur-md ${
        live ? "border-brand-sky/40 bg-ink/70 text-white" : "border-white/15 bg-ink/70 text-white/70"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${live ? "bg-gradient-to-r from-brand-sky to-brand-pink" : "bg-white/50"}`}
      />
      {live ? "Live" : project.status || "Private client work"}
    </span>
  );
}
