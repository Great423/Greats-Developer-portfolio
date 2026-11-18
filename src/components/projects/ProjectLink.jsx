/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

/** Case-study URL when there is one, otherwise the live site. */
function projectHref(project) {
  if (project.caseStudy) return { to: `/project-info/${project.slug}` };
  if (project.liveUrl) return { href: project.liveUrl, external: true };
  return null;
}

/**
 * The project's primary link. With `stretched`, its click area covers the
 * nearest positioned ancestor (the whole card) without nesting links.
 */
export default function ProjectLink({ project, stretched = false, className = "", children, ...rest }) {
  const target = projectHref(project);
  const stretch = stretched ? "after:absolute after:inset-0 after:z-[3] after:content-['']" : "";
  const classes = `rounded-sm focus-visible:outline-none ${stretch} ${className}`;

  if (!target) return <span className={className}>{children}</span>;
  if (target.to) {
    return (
      <Link to={target.to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={target.href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
