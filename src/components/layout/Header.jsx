/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FiArrowRight, FiArrowUpRight, FiDownload } from "react-icons/fi";
import { links, navItems, person } from "../../data/site";
import { ease, navSpring } from "../../lib/motion";
import useActiveSection from "../../hooks/useActiveSection";
import Button from "../ui/Button";
import SocialLinks from "../ui/SocialLinks";

const sectionIds = navItems.map((item) => item.id);

function Logo() {
  return (
    <Link
      to="/"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex min-h-[44px] items-center rounded-md font-primary text-2xl font-bold tracking-tight text-white md:text-[26px]"
      aria-label={`${person.name}, home`}
    >
      Gre<span className="text-gradient">at.</span>
    </Link>
  );
}

function MenuIcon({ open }) {
  return (
    <span aria-hidden="true" className="relative block h-3 w-5">
      <motion.span
        className="absolute left-0 top-0 h-[1.5px] w-5 rounded-full bg-white"
        animate={open ? { top: "50%", rotate: 45 } : { top: "0%", rotate: 0 }}
        transition={{ duration: 0.35, ease: ease.out }}
      />
      <motion.span
        className="absolute bottom-0 left-0 h-[1.5px] w-5 rounded-full bg-white"
        animate={open ? { bottom: "50%", rotate: -45 } : { bottom: "0%", rotate: 0 }}
        transition={{ duration: 0.35, ease: ease.out }}
      />
    </span>
  );
}

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const onProjectRoute = location.pathname.startsWith("/project");
  const sectionInView = useActiveSection(sectionIds, isHome);
  const active = isHome ? sectionInView : onProjectRoute ? "work" : null;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  // Close the menu whenever navigation happens.
  useEffect(() => setOpen(false), [location.key]);

  // Lock scroll, trap focus and close on Escape while the menu is open.
  useEffect(() => {
    if (!open) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !headerRef.current) return;
      const focusable = [...headerRef.current.querySelectorAll("a[href], button:not([disabled])")].filter(
        (el) => el.offsetParent !== null
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const sectionLink = (id) => ({ pathname: "/", hash: `#${id}` });
  const solid = scrolled || open;

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-expo ${
          solid ? "border-b border-white/[0.07] bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="container flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] p-1">
              {navItems.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <li key={id} className="relative">
                    <Link
                      to={sectionLink(id)}
                      replace={isHome}
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
            <Button to={sectionLink("contact")} className="hidden !min-h-[42px] !px-5 sm:inline-flex" icon={FiArrowRight}>
              Work with me
            </Button>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:border-white/25 lg:hidden"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-ink/[0.97] backdrop-blur-2xl lg:hidden"
          >
            <div className="container flex min-h-full flex-col pb-10 pt-6">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
                className="divide-y divide-white/[0.07] border-y border-white/[0.07]"
              >
                {[...navItems, { id: "projects", label: "All projects", to: "/projects" }].map((item, index) => (
                  <motion.li
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
                    }}
                  >
                    <Link
                      to={item.to || sectionLink(item.id)}
                      replace={isHome && !item.to}
                      aria-current={active === item.id ? "true" : undefined}
                      className="group flex items-center justify-between py-4 font-primary text-[22px] font-semibold text-white/85 transition-colors hover:text-white"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="w-6 shrink-0 text-[11px] font-medium text-white/35">{String(index + 1).padStart(2, "0")}</span>
                        <span className={active === item.id ? "text-gradient" : ""}>{item.label}</span>
                      </span>
                      <FiArrowRight
                        aria-hidden="true"
                        className="h-5 w-5 text-white/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                      />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.5, ease: ease.out } }}
                className="mt-auto space-y-6 pt-10"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button href={links.cvDownload} download variant="secondary" icon={FiDownload}>
                    Download CV
                  </Button>
                  <Button href={links.cvOnline} external variant="secondary" icon={FiArrowUpRight}>
                    View online CV
                  </Button>
                </div>
                <a href={`mailto:${person.email}`} className="flex min-h-[44px] items-center break-all text-lg text-white/70 hover:text-white">
                  {person.email}
                </a>
                <SocialLinks />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
