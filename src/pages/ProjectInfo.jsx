/* eslint-disable react/prop-types */
import { useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiGithub } from "react-icons/fi";
import { getProjectBySlug, projects } from "../data/projects";
import { fadeUp, maskReveal, scaleIn, staggerContainer } from "../lib/motion";
import useActiveSection from "../hooks/useActiveSection";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Button from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import StatusBadge from "../components/ui/StatusBadge";
import { TagList } from "../components/ui/Tag";
import ProjectMedia from "../components/projects/ProjectMedia";

const slugify = (text) =>
  `cs-${text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

const splitList = (text) => text.split(" · ").map((item) => item.trim()).filter(Boolean);

function Paragraph({ paragraph }) {
  if (typeof paragraph === "string") return <p>{paragraph}</p>;
  return (
    <p>
      <span className="font-semibold text-white">{paragraph.lead}</span> {paragraph.text}
    </p>
  );
}

/** Renders one case-study section. Stack, Modules and Scope get their own treatment. */
function CaseSection({ section }) {
  const id = slugify(section.heading);
  const heading = (
    <h2 className="font-primary text-xl font-semibold text-white md:text-2xl [text-wrap:balance]">{section.heading}</h2>
  );

  if (section.heading === "Stack") {
    return (
      <Reveal as="section" id={id} aria-label={section.heading}>
        {heading}
        <div className="mt-6 space-y-6">
          {section.paragraphs.map((paragraph, index) => {
            const label = typeof paragraph === "string" ? null : paragraph.lead.replace(/:$/, "");
            const text = typeof paragraph === "string" ? paragraph : paragraph.text;
            return (
              <div key={index}>
                {label && <p className="eyebrow mb-3">{label}</p>}
                <TagList tags={splitList(text)} label={label || section.heading} />
              </div>
            );
          })}
        </div>
      </Reveal>
    );
  }

  if (section.heading === "Modules") {
    const items = section.paragraphs.flatMap((paragraph) => splitList(typeof paragraph === "string" ? paragraph : paragraph.text));
    return (
      <Reveal as="section" id={id} aria-label={section.heading}>
        {heading}
        <ul className="mt-6 grid gap-x-8 gap-y-3 text-white/75 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient" />
              <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    );
  }

  const callout = section.heading === "Scope boundary";
  return (
    <Reveal
      as="section"
      id={id}
      aria-label={section.heading}
      className={callout ? "rounded-[20px] border border-brand-violet/25 bg-brand-violet/[0.06] p-6 md:p-8" : ""}
    >
      {heading}
      <div className="mt-5 space-y-5 text-white/70">
        {section.paragraphs.map((paragraph, index) => (
          <Paragraph key={index} paragraph={paragraph} />
        ))}
      </div>
      {section.bullets?.length > 0 && (
        <ul className="mt-6 space-y-3 text-white/70">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );
}

function ProjectActionsBar({ project }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.liveUrl && (
        <Button href={project.liveUrl} external icon={FiArrowUpRight}>
          Visit site
        </Button>
      )}
      {project.repoUrl && (
        <Button href={project.repoUrl} external variant="secondary" icon={FiGithub}>
          View code
        </Button>
      )}
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/projects"
      className="group inline-flex min-h-[44px] items-center gap-2 font-primary text-[11px] uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-white"
    >
      <FiArrowLeft aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1" />
      All projects
    </Link>
  );
}

function Fallback({ eyebrow, title, body, project }) {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center pb-24 pt-[calc(var(--header-h)+4rem)] text-center">
      <motion.div variants={staggerContainer(0.09)} initial="hidden" animate="show" className="max-w-xl">
        <motion.div variants={fadeUp} className="flex justify-center">
          {eyebrow}
        </motion.div>
        <motion.h1 variants={fadeUp} className="mt-6 font-primary text-title font-semibold text-white">
          {title}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-5 text-lead text-white/65">
          {body}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-3">
          {project && <ProjectActionsBar project={project} />}
          <Button to="/projects" variant="secondary" icon={FiArrowLeft}>
            All projects
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function CaseStudy({ project }) {
  const mediaRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "4%"]);

  const sections = project.caseStudy.sections;
  const sectionIds = useMemo(() => sections.map((section) => slugify(section.heading)), [sections]);
  const activeId = useActiveSection(sectionIds);

  const withCaseStudy = projects.filter((item) => item.caseStudy);
  const position = withCaseStudy.findIndex((item) => item.slug === project.slug);
  const previous = withCaseStudy[(position - 1 + withCaseStudy.length) % withCaseStudy.length];
  const next = withCaseStudy[(position + 1) % withCaseStudy.length];

  return (
    <article className="pb-24 pt-[calc(var(--header-h)+2rem)] md:pb-32 md:pt-[calc(var(--header-h)+3rem)]">
      <div className="container">
        <motion.header variants={staggerContainer(0.08, 0.05)} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-4">
            <BackLink />
            <StatusBadge project={project} />
          </motion.div>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-8">
              <motion.p variants={fadeUp} className="eyebrow">
                {project.sector}
              </motion.p>
              <h1
                className={`mt-4 overflow-hidden pb-[0.08em] font-primary font-semibold leading-[1.05] text-white ${
                  project.title.length > 24 ? "text-[clamp(1.85rem,1.1rem+2.4vw,3.25rem)]" : "text-[clamp(2rem,1.2rem+3.4vw,4rem)]"
                }`}
              >
                <motion.span variants={maskReveal} className="inline-block [text-wrap:balance]">
                  {project.title}
                </motion.span>
              </h1>
              <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lead text-white/70">
                {project.description}
              </motion.p>
            </div>
            <motion.div variants={fadeUp} className="lg:col-span-4 lg:flex lg:justify-end">
              <ProjectActionsBar project={project} />
            </motion.div>
          </div>

          <motion.dl variants={fadeUp} className="mt-12 grid border-y border-white/[0.08] sm:grid-cols-3">
            <div className="py-5 sm:pr-6">
              <dt className="eyebrow">Role</dt>
              <dd className="mt-2 font-semibold text-white">{project.role}</dd>
            </div>
            <div className="border-t border-white/[0.08] py-5 sm:border-l sm:border-t-0 sm:px-6">
              <dt className="eyebrow">Status</dt>
              <dd className="mt-2 font-semibold text-white">{project.liveUrl ? "Live" : project.status}</dd>
            </div>
            <div className="border-t border-white/[0.08] py-5 sm:border-l sm:border-t-0 sm:pl-6">
              <dt className="eyebrow">Stack</dt>
              <dd className="mt-3">
                <TagList tags={project.stack} size="sm" label={`${project.title} stack`} />
              </dd>
            </div>
          </motion.dl>
        </motion.header>

        <motion.div
          ref={mediaRef}
          variants={scaleIn}
          initial="hidden"
          animate="show"
          className="relative mt-12 aspect-[16/10] overflow-hidden rounded-[24px] border border-white/10 bg-ink-800 shadow-frame md:mt-16"
        >
          <motion.div style={project.image ? { y: mediaY } : undefined} className={`absolute ${project.image ? "inset-[-5%]" : "inset-0"}`}>
            <ProjectMedia project={project} priority />
          </motion.div>
        </motion.div>

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <p className="eyebrow">On this page</p>
              <ul className="mt-5 space-y-1 border-l border-white/[0.08]">
                {sections.map((section) => {
                  const id = slugify(section.heading);
                  const isActive = activeId === id;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`-ml-px block border-l py-1.5 pl-4 text-[15px] transition-colors duration-300 ${
                          isActive ? "border-brand-pink text-white" : "border-transparent text-white/50 hover:text-white"
                        }`}
                      >
                        {section.heading}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <div className="max-w-3xl space-y-14 md:space-y-16">
            {sections.map((section) => (
              <CaseSection key={section.heading} section={section} />
            ))}
          </div>
        </div>

        <nav aria-label="More case studies" className="mt-24 grid gap-px overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 md:mt-32">
          {[
            { label: "Previous case study", project: previous, Icon: FiArrowLeft, align: "" },
            { label: "Next case study", project: next, Icon: FiArrowRight, align: "sm:text-right" },
          ].map(({ label, project: item, Icon, align }) => (
            <Link
              key={label}
              to={`/project-info/${item.slug}`}
              className={`group flex flex-col gap-3 bg-ink-900 p-6 transition-colors duration-500 hover:bg-ink-850 md:p-8 ${align}`}
            >
              <span className={`eyebrow flex items-center gap-2 ${align ? "sm:justify-end" : ""}`}>
                {label === "Previous case study" && <Icon aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1" />}
                {label}
                {label === "Next case study" && <Icon aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />}
              </span>
              <span className="font-primary text-lg font-semibold text-white md:text-xl">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </article>
  );
}

export default function ProjectInfo() {
  const { id } = useParams();
  const project = getProjectBySlug(id);
  useDocumentTitle(project ? project.title : "Project not found");

  if (!project) {
    return (
      <Fallback
        eyebrow={<span className="eyebrow">404</span>}
        title="Project not found."
        body="The case study you're looking for doesn't exist."
      />
    );
  }

  if (!project.caseStudy) {
    return (
      <Fallback
        eyebrow={<StatusBadge project={project} />}
        title={project.title}
        body="A written case study for this project isn't available yet."
        project={project}
      />
    );
  }

  return <CaseStudy key={project.slug} project={project} />;
}
