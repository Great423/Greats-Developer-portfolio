/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { links, navItems, person } from "../../data/site";
import { navSpring } from "../../lib/motion";
import { bottomNavSectionMap, homeSections, scrollToTop, sectionTarget } from "../../lib/navigation";
import useActiveSection from "../../hooks/useActiveSection";
import Button from "../ui/Button";
import BottomNav from "./BottomNav";

const otherRouteSections = ["contact"];

function Logo({ isHome }) {
  return (
    <Link
      to="/"
      onClick={() => isHome && scrollToTop()}
      className="inline-flex min-h-[44px] items-center rounded-md font-primary text-2xl font-bold tracking-tight text-white md:text-[26px]"
      aria-label={`${person.name}, home`}
    >
      Gre<span className="text-gradient">at.</span>
    </Link>
  );
}

/** Thin gradient bar under the header showing how far through a case study the reader is. */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-brand-blue via-brand-violet to-brand-pink"
    />
  );
}

/**
 * Site navigation. Desktop (lg and up): the header bar with section links.
 * Phones and tablets: a slim header with the logo and CV, plus the floating
 * BottomNav. One scroll spy feeds both, so only one runs.
 */
export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const onProjectRoute = pathname.startsWith("/project");
  const onCaseStudy = pathname.startsWith("/project-info/");

  const section = useActiveSection(isHome ? homeSections : otherRouteSections);
  let active = null;
  if (isHome) active = section;
  else if (section === "contact") active = "contact";
  else if (onProjectRoute) active = "work";

  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`relative transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-expo ${
            scrolled ? "border-b border-white/[0.07] bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
          }`}
        >
          <div className="container flex h-[var(--header-h)] items-center justify-between gap-6">
            <Logo isHome={isHome} />

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] p-1">
                {navItems.map(({ id, label }) => {
                  const isActive = active === id;
                  const target = sectionTarget(id, pathname);
                  return (
                    <li key={id} className="relative">
                      <Link
                        to={target}
                        replace={target.pathname === pathname}
                        aria-current={isActive ? "true" : undefined}
                        className={`relative z-10 block rounded-full px-4 py-2 font-primary text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/55 hover:text-white"
                        }`}
                      >
                        {label}
                      </Link>
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          transition={navSpring}
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Button
                to={sectionTarget("contact", pathname)}
                replace
                magnetic
                className="hidden !min-h-[42px] !px-5 lg:inline-flex"
                icon={FiArrowRight}
              >
                Work with me
              </Button>
              <Button
                href={links.cvDownload}
                download
                variant="secondary"
                icon={FiDownload}
                className="!min-h-[44px] !px-4 lg:hidden"
                aria-label="Download CV (PDF)"
              >
                CV
              </Button>
            </div>
          </div>
          {onCaseStudy && <ReadingProgress />}
        </div>
      </header>

      <BottomNav active={isHome ? bottomNavSectionMap[active] ?? null : active} pathname={pathname} />
    </>
  );
}
