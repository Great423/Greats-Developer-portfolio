import { Link, useLocation } from "react-router-dom";
import { FiArrowUp } from "react-icons/fi";
import { navItems, person } from "../../data/site";
import { scrollToTop, sectionTarget } from "../../lib/navigation";
import SocialLinks from "../ui/SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();

  return (
    <footer className="relative border-t border-white/[0.07]">
      <div className="container grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_auto] md:gap-10">
        <div>
          <Link to="/" className="inline-flex min-h-[44px] items-center rounded-md font-primary text-2xl font-bold text-white" aria-label={`${person.name}, home`}>
            Gre<span className="text-gradient">at.</span>
          </Link>
          <p className="mt-4 max-w-sm text-white/55">
            {person.positioning[0]} | {person.positioning[1]}
          </p>
          <a href={`mailto:${person.email}`} className="mt-2 inline-flex min-h-[44px] items-center break-all text-white/80 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-brand-pink">
            {person.email}
          </a>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow">Navigate</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-8">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <Link to={sectionTarget(id, pathname)} className="flex min-h-[44px] w-full items-center text-white/65 transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/projects" className="flex min-h-[44px] w-full items-center text-white/65 transition-colors hover:text-white">
                All projects
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="eyebrow">Elsewhere</p>
          <SocialLinks size="sm" className="mt-5 max-w-[230px]" />
        </div>
      </div>

      <div className="border-t border-white/[0.05]">
        <div className="container flex flex-col-reverse gap-4 py-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {person.name}. Built with React, Vite, Tailwind CSS and Framer Motion.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex min-h-[44px] items-center gap-2 self-start font-primary text-[11px] uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white sm:self-auto"
          >
            Back to top
            <FiArrowUp aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
