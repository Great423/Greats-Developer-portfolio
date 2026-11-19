/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiLock } from "react-icons/fi";
import Picture from "../ui/Picture";

/**
 * Project visual. Uses the screenshot when one exists; otherwise (internal
 * systems such as Dataflex HR, which has no screenshots by design) renders a
 * typographic panel built from the project's own tags.
 */
export default function ProjectMedia({ project, priority = false, sizes = "100vw", className = "" }) {
  const [failed, setFailed] = useState(false);
  const showImage = project.image && !failed;

  if (showImage) {
    return (
      <Picture
        src={project.image}
        sizes={sizes}
        alt={`${project.title} website preview`}
        width="1600"
        height="1000"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover object-top ${className}`}
      />
    );
  }

  const tags = project.visualTags || project.stack || [];
  return (
    <div
      role="img"
      aria-label={`${project.title}: ${project.status || "internal project"}`}
      className={`relative h-full w-full overflow-hidden bg-[linear-gradient(140deg,#17131f_0%,#0c0b10_55%,#0a0a0a_100%)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-[15%] -top-[25%] h-[85%] w-[70%] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(185,54,238,0.35), transparent)" }}
      />
      <div className="relative flex h-full flex-col justify-end p-5 sm:justify-between sm:p-9">
        <p className="eyebrow hidden items-center gap-2 self-end text-white/60 sm:flex">
          <FiLock aria-hidden="true" className="h-3.5 w-3.5" />
          Internal platform
        </p>
        <div>
          <p className="font-primary text-xl font-semibold leading-tight text-white sm:text-4xl">
            {project.shortTitle || project.title}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2" aria-hidden="true">
            {tags.map((tag, index) => (
              <li
                key={tag}
                className={`${index > 3 ? "max-sm:hidden " : ""}rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-primary text-[9px] uppercase tracking-[0.12em] text-white/70 sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.14em]`}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
