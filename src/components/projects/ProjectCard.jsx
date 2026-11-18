/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { cardPress, fadeUp } from "../../lib/motion";
import useTilt from "../../hooks/useTilt";
import StatusBadge from "../ui/StatusBadge";
import { TagList } from "../ui/Tag";
import ProjectActions from "./ProjectActions";
import ProjectLink from "./ProjectLink";
import ProjectMedia from "./ProjectMedia";

/**
 * Catalogue card. `layout="wide"` places media and text side by side from
 * the lg breakpoint, for the lead project on the projects page.
 */
export default function ProjectCard({ project, layout = "stacked", priority = false }) {
  const wide = layout === "wide";
  const tilt = useTilt({ max: wide ? 4 : 6 });
  return (
    <motion.article
      variants={fadeUp}
      {...cardPress}
      {...tilt.handlers}
      className={`group relative flex h-full flex-col ${wide ? "lg:grid lg:grid-cols-12 lg:items-center lg:gap-12" : ""}`}
    >
      <motion.div
        ref={tilt.ref}
        style={tilt.style}
        className={`gradient-border relative aspect-[16/10] overflow-hidden rounded-[20px] border border-white/10 bg-ink-800 shadow-frame ${
          wide ? "lg:col-span-7" : ""
        }`}
      >
        {/* Depth: the image drifts against the tilt while the badge floats with it. */}
        <motion.div style={tilt.mediaStyle} className="h-full w-full">
          <ProjectMedia
            project={project}
            priority={priority}
            className="transition-transform duration-[1000ms] ease-out-expo group-hover:scale-[1.06]"
          />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        <motion.div aria-hidden="true" style={tilt.glareStyle} className="pointer-events-none absolute inset-0 z-[2]" />
        <motion.div style={tilt.floatStyle} className="absolute left-4 top-4 z-[3]">
          <StatusBadge project={project} />
        </motion.div>
      </motion.div>

      <div className={`flex flex-1 flex-col pt-6 ${wide ? "lg:col-span-5 lg:pt-0" : ""}`}>
        <p className="eyebrow">{project.sector}</p>
        <h3 className={`mt-3 font-primary font-semibold leading-snug text-white [text-wrap:balance] ${wide ? "text-2xl md:text-[28px]" : "text-xl"}`}>
          <ProjectLink project={project} stretched className="transition-colors duration-300 group-hover:text-white">
            {project.title}
          </ProjectLink>
        </h3>
        <p className="mt-2 text-[15px] font-semibold text-white/50">{project.role}</p>
        <p className={`mt-4 text-white/65 ${wide ? "" : "line-clamp-3"}`}>{project.description}</p>
        <TagList tags={project.stack} size="sm" label={`${project.title} technology`} className="mt-5" />
        <ProjectActions project={project} className="mt-auto pt-6" />
      </div>
    </motion.article>
  );
}
