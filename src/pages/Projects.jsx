/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { projectsIntro } from "../data/site";
import { fadeUp, maskReveal, staggerContainer, viewportOnce } from "../lib/motion";
import useDocumentTitle from "../hooks/useDocumentTitle";
import ProjectCard from "../components/projects/ProjectCard";
import { Reveal } from "../components/ui/Reveal";

const featured = projects.filter((project) => project.featured);
// Remaining projects: written case studies first, then live sites.
const more = projects
  .filter((project) => !project.featured)
  .sort(
    (a, b) =>
      Number(Boolean(b.caseStudy)) - Number(Boolean(a.caseStudy)) ||
      Number(Boolean(b.liveUrl)) - Number(Boolean(a.liveUrl))
  );
const liveCount = projects.filter((project) => project.liveUrl).length;

function GroupHeading({ id, title, count }) {
  return (
    <Reveal className="flex items-baseline gap-4 border-b border-white/[0.08] pb-4">
      <h2 id={id} className="font-primary text-lg font-semibold text-white">
        {title}
      </h2>
      <span className="font-primary text-[11px] text-white/35">{String(count).padStart(2, "0")}</span>
    </Reveal>
  );
}

export default function Projects() {
  useDocumentTitle("Projects");
  const [lead, ...rest] = featured;

  return (
    <div className="pb-24 pt-[calc(var(--header-h)+3rem)] md:pb-32 md:pt-[calc(var(--header-h)+5rem)]">
      <div className="container">
        <motion.header variants={staggerContainer(0.09, 0.05)} initial="hidden" animate="show" className="max-w-3xl">
          <motion.p variants={fadeUp} className="eyebrow">
            <span aria-hidden="true" className="text-brand-pink">&lt;</span>
            projects
            <span aria-hidden="true" className="text-brand-pink"> /&gt;</span>
          </motion.p>
          <h1 className="mt-5 overflow-hidden pb-[0.06em] font-primary text-display-sm font-semibold text-white">
            <motion.span variants={maskReveal} className="inline-block">
              Projects<span className="text-gradient">.</span>
            </motion.span>
          </h1>
          <motion.p variants={fadeUp} className="mt-6 text-lead text-white/65">
            {projectsIntro}
          </motion.p>
          <motion.p variants={fadeUp} className="eyebrow mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <span>{projects.length} projects</span>
            <span>{liveCount} live</span>
            <span>{projects.filter((project) => project.caseStudy).length} case studies</span>
          </motion.p>
        </motion.header>

        <section aria-labelledby="featured-title" className="mt-16 md:mt-24">
          <GroupHeading id="featured-title" title="Featured" count={featured.length} />
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-10 grid gap-x-10 gap-y-16 md:grid-cols-2"
          >
            {lead && (
              <div className="md:col-span-2">
                <ProjectCard project={lead} layout="wide" priority />
              </div>
            )}
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>
        </section>

        <section aria-labelledby="more-title" className="mt-24 md:mt-32">
          <GroupHeading id="more-title" title="More projects" count={more.length} />
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-10 grid gap-x-10 gap-y-16 sm:grid-cols-2"
          >
            {more.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
