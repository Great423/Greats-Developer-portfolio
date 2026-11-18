/**
 * Fixed backdrop: near-black base with three soft brand-colour glows and a
 * dot grid that fades out below the fold. Two glows drift very slowly; the
 * drift stops under prefers-reduced-motion.
 */
export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div
        className="absolute -left-[25%] -top-[30%] h-[80vmax] w-[80vmax] animate-aurora rounded-full opacity-70"
        style={{ background: "radial-gradient(closest-side, rgba(64,106,255,0.20), rgba(64,106,255,0) 72%)" }}
      />
      <div
        className="absolute -right-[20%] top-[5%] h-[70vmax] w-[70vmax] animate-aurora-slow rounded-full opacity-70"
        style={{ background: "radial-gradient(closest-side, rgba(185,54,238,0.18), rgba(185,54,238,0) 72%)" }}
      />
      <div
        className="absolute -bottom-[35%] left-[15%] h-[65vmax] w-[65vmax] rounded-full opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(255,86,246,0.10), rgba(255,86,246,0) 72%)" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
    </div>
  );
}
