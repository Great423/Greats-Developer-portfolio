/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

const linkClass =
  "group/link relative z-[4] inline-flex min-h-[44px] items-center gap-2 font-primary text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300";

/** Compact text links shown under a project card. */
export default function ProjectActions({ project, className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-1 ${className}`}>
      {project.caseStudy && (
        <Link to={`/project-info/${project.slug}`} className={`${linkClass} text-white hover:text-brand-pink`}>
          Case study
          <FiArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      )}
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} text-white/60 hover:text-white`}>
          Visit site
          <FiArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} text-white/60 hover:text-white`}>
          Code
          <FiArrowUpRight aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
