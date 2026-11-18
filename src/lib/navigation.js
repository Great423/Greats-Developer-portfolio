/*
 * Navigation helpers shared by the desktop header, the mobile bottom
 * navigation and the footer, so every link resolves the same way.
 */

/** Every homepage section, in page order, for active-section tracking. */
export const homeSections = ["home", "work", "about", "experience", "skills", "education", "services", "contact"];

/**
 * Sections without their own bottom-navigation item count as the nearest
 * item above them, so the indicator never jumps backwards while scrolling.
 */
export const bottomNavSectionMap = {
  home: "home",
  work: "work",
  about: "about",
  experience: "experience",
  skills: "experience",
  education: "experience",
  services: "experience",
  contact: "contact",
};

/**
 * Link target for a homepage section. The contact section is rendered on
 * every route, so it is reached on the current page instead of leaving it.
 */
export function sectionTarget(id, pathname) {
  return { pathname: id === "contact" ? pathname : "/", hash: `#${id}` };
}

/** Smooth scroll to the top, instant when reduced motion is requested. */
export function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}
