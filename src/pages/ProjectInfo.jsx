/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaGithub, FaLink } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import { getProjectBySlug } from "../data/projects";

const secondaryAction =
  "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 font-primary text-[11px] uppercase tracking-[0.16em] text-white/70 transition hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF56F6]/70";

function StatusBadge({ liveUrl }) {
  if (liveUrl) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-[#42A6E3]/40 bg-white/5 px-3 py-1.5 font-primary text-[10px] uppercase tracking-[0.16em] text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#42A6E3] to-[#FF56F6]" />
        Live
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-primary text-[10px] uppercase tracking-[0.16em] text-white/60">
      Private client work
    </span>
  );
}

export default function ProjectInfo() {
  const { id } = useParams();
  const project = getProjectBySlug(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="container mx-auto max-w-3xl py-24 text-center">
        <h1 className="text-gradient font-semibold text-4xl">
          Project not found.
        </h1>
        <p className="mt-4 text-white/60">
          The case study you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/projects"
          className="btn btn-sm mt-8 inline-flex items-center gap-2"
        >
          <FaArrowLeft aria-hidden="true" />
          All projects
        </Link>
      </div>
    );
  }

  const { title, role, description, stack, image, liveUrl, repoUrl, caseStudy } =
    project;

  if (!caseStudy) {
    return (
      <div className="container mx-auto max-w-3xl py-24 text-center">
        <StatusBadge liveUrl={liveUrl} />
        <h1 className="text-gradient mt-6 font-semibold text-4xl">{title}</h1>
        <p className="mt-4 text-white/60">
          A written case study for this project isn&apos;t available yet.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm inline-flex items-center gap-2"
            >
              Visit site
              <FaLink aria-hidden="true" />
            </a>
          )}
          <Link to="/projects" className={secondaryAction}>
            <FaArrowLeft aria-hidden="true" />
            All projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="project-info" className="pb-20">
      <div className="container mx-auto max-w-5xl">
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-primary text-[11px] uppercase tracking-[0.16em] text-white/50 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF56F6]/70"
          >
            <FaArrowLeft aria-hidden="true" />
            All projects
          </Link>
          <StatusBadge liveUrl={liveUrl} />
        </div>

        <header className="mt-10 max-w-3xl">
          <p className="font-primary text-[11px] uppercase tracking-[0.18em] text-white/45">
            {role}
          </p>
          <h1 className="text-gradient mt-3 font-semibold text-4xl md:text-5xl">
            {title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm inline-flex items-center gap-2"
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
                View code
                <FaGithub aria-hidden="true" />
              </a>
            )}
          </div>
        </header>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#2a1350] via-[#1e0b38] to-[#0a0a0a]">
          <div className="relative aspect-[16/9]">
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center font-primary text-7xl text-white/10"
            >
              {title.charAt(0)}
            </span>
            {liveUrl && (
              <img
                src={image}
                alt={`${title} project preview`}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
                className="relative h-full w-full object-cover"
              />
            )}
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <section>
            <h2 className="text-gradient font-primary text-2xl">Overview</h2>
            <p className="mt-5 text-white/70 leading-8">{description}</p>
          </section>

          <aside className="h-fit rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
            <h2 className="font-primary text-lg uppercase tracking-[0.12em] text-white">
              Project details
            </h2>
            <dl className="mt-5 space-y-5">
              <div>
                <dt className="font-primary text-[10px] uppercase tracking-[0.16em] text-white/40">
                  Role
                </dt>
                <dd className="mt-1 text-white/80">{role}</dd>
              </div>
              <div>
                <dt className="font-primary text-[10px] uppercase tracking-[0.16em] text-white/40">
                  Status
                </dt>
                <dd className="mt-1 text-white/80">
                  {liveUrl ? "Live" : "Private client work"}
                </dd>
              </div>
              {stack.length > 0 && (
                <div>
                  <dt className="font-primary text-[10px] uppercase tracking-[0.16em] text-white/40">
                    Stack
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {stack.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-primary text-[10px] uppercase tracking-[0.12em] text-white/55"
                      >
                        {tool}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </div>

        <div className="mt-12">
          <Link to="/projects" className={secondaryAction}>
            <FaArrowLeft aria-hidden="true" />
            Back to all projects
          </Link>
        </div>
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
  );
}
