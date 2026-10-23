import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub, FaLink } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import { projects } from "../data/projects";

const secondaryAction =
  "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-primary text-[11px] uppercase tracking-[0.16em] text-white/70 transition hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF56F6]/70";

const primaryAction =
  "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#406aff] via-[#b936ee] to-[#FF56F6] px-4 py-2 font-primary text-[11px] uppercase tracking-[0.16em] text-white shadow-[0_0_20px_rgba(255,86,246,0.25)] transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF56F6]/70";

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sortedProjects = [...projects].sort(
    (a, b) => Number(Boolean(b.liveUrl)) - Number(Boolean(a.liveUrl))
  );

  return (
    <div id="projects" className="projects pb-20">
      <div className="container mx-auto space-y-10">
        <div className="mt-10 space-y-4 text-center">
          <h1 className="text-gradient font-semibold text-4xl">Projects.</h1>
          <h4 className="text-xl">Selected work I&apos;ve taken on in the past.</h4>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedProjects.map((project) => {
            const {
              title,
              slug,
              role,
              description,
              stack,
              image,
              liveUrl,
              repoUrl,
              caseStudy,
            } = project;

            return (
              <article
                key={slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_18px_50px_rgba(184,9,195,0.18)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#2a1350] via-[#1e0b38] to-[#0a0a0a]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center font-primary text-5xl text-white/10"
                  >
                    {title.charAt(0)}
                  </span>
                  {liveUrl && (
                    <img
                      src={image}
                      alt={`${title} project preview`}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                      className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />

                  {liveUrl ? (
                    <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-[#42A6E3]/40 bg-[#0a0a0a]/80 px-3 py-1.5 font-primary text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#42A6E3] to-[#FF56F6]" />
                      Live
                    </span>
                  ) : (
                    <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full border border-white/15 bg-[#0a0a0a]/80 px-3 py-1.5 font-primary text-[10px] uppercase tracking-[0.16em] text-white/60 backdrop-blur">
                      Private client work
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="font-primary text-[11px] uppercase tracking-[0.18em] text-white/45">
                    {role}
                  </p>
                  <h2 className="text-gradient mt-2 font-primary text-xl md:text-2xl">
                    {title}
                  </h2>
                  <p className="mt-3 line-clamp-2 text-sm leading-7 text-white/65">
                    {description}
                  </p>

                  {stack.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {stack.map((tool) => (
                        <li
                          key={tool}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-primary text-[10px] uppercase tracking-[0.12em] text-white/55"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                    {caseStudy && (
                      <Link
                        to={`/project-info/${slug}`}
                        className={secondaryAction}
                      >
                        Details
                        <FaArrowRight aria-hidden="true" />
                      </Link>
                    )}

                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={primaryAction}
                      >
                        Visit site
                        <FaLink aria-hidden="true" />
                      </a>
                    )}

                    {repoUrl && (
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={secondaryAction}
                      >
                        Code
                        <FaGithub aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="gradient fixed bottom-8 right-8 z-[100] flex h-[45px] w-[45px] items-center justify-center rounded-full text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <IoIosArrowUp aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
