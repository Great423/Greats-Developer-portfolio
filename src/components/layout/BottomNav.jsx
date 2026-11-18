/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBriefcase, FiHome, FiLayers, FiMail, FiUser } from "react-icons/fi";
import { ease, navSpring } from "../../lib/motion";
import { scrollToTop, sectionTarget } from "../../lib/navigation";

const MotionLink = motion(Link);

const items = [
  { id: "home", label: "Home", Icon: FiHome },
  { id: "work", label: "Work", Icon: FiLayers },
  { id: "about", label: "About", Icon: FiUser },
  { id: "experience", label: "Experience", Icon: FiBriefcase },
  { id: "contact", label: "Contact", Icon: FiMail },
];

const isTextField = (element) =>
  element instanceof HTMLElement &&
  (element.matches("textarea, select, [contenteditable='true']") ||
    (element.matches("input") && !["button", "submit", "reset", "checkbox", "radio", "range", "file"].includes(element.type)));

/**
 * Floating bottom navigation for phones and tablets (below the lg
 * breakpoint, where the desktop header navigation takes over).
 * It steps aside while a text field has focus so it can never sit on top of
 * the on-screen keyboard or the field being typed in.
 */
export default function BottomNav({ active, pathname }) {
  const [typing, setTyping] = useState(false);
  const onProjectRoute = pathname.startsWith("/project");

  useEffect(() => {
    const onFocusIn = (event) => setTyping(isTextField(event.target));
    const onFocusOut = (event) => {
      if (!isTextField(event.relatedTarget)) setTyping(false);
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const targetFor = (id) => {
    if (id === "home") return { pathname: "/" };
    if (id === "work" && onProjectRoute) return { pathname: "/projects" };
    return sectionTarget(id, pathname);
  };

  return (
    <motion.nav
      aria-label="Primary"
      data-bottom-nav=""
      data-hidden={typing ? "true" : "false"}
      initial={{ y: "140%", opacity: 0 }}
      animate={typing ? { y: "140%", opacity: 0 } : { y: "0%", opacity: 1 }}
      transition={typing ? { duration: 0.25, ease: ease.inOut } : { duration: 0.6, ease: ease.out, delay: 0.15 }}
      className="bottom-nav fixed z-40 mx-auto max-w-[480px] lg:hidden"
    >
      <ul className="relative flex items-stretch gap-0.5 rounded-[26px] border border-white/[0.09] bg-ink-850/[0.86] p-1.5 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150">
        {/* Soft brand glow along the top edge of the glass. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-brand-violet/60 to-transparent"
        />
        {items.map(({ id, label, Icon }) => {
          const isActive = active === id;
          const target = targetFor(id);
          const samePath = target.pathname === pathname;
          return (
            <li key={id} className="relative flex-1">
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-indicator"
                  transition={navSpring}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))]"
                >
                  <span className="absolute left-1/2 top-0 h-[2px] w-6 -translate-x-1/2 rounded-full bg-brand-gradient shadow-[0_0_12px_2px_rgba(255,86,246,0.55)]" />
                </motion.span>
              )}
              <MotionLink
                to={target}
                replace={samePath && Boolean(target.hash)}
                onClick={() => {
                  // Same page and no hash to follow: return to the top instead.
                  if (samePath && !target.hash) scrollToTop();
                }}
                aria-current={isActive ? "true" : undefined}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`relative z-10 flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-[20px] px-1 transition-colors duration-300 [-webkit-tap-highlight-color:transparent] focus-visible:outline-offset-[-2px] ${
                  isActive ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                <Icon
                  aria-hidden="true"
                  className={`h-[19px] w-[19px] transition-[filter,transform] duration-500 ease-out-expo ${
                    isActive ? "-translate-y-px drop-shadow-[0_0_8px_rgba(255,86,246,0.55)]" : ""
                  }`}
                />
                <span className="whitespace-nowrap font-secondary text-[11.5px] font-semibold leading-none tracking-[0.02em]">
                  {label}
                </span>
              </MotionLink>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
