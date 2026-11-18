/* eslint-disable react/prop-types */
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";
import useTilt from "../../hooks/useTilt";
import Button from "../ui/Button";
import StatusBadge from "../ui/StatusBadge";
import { TagList } from "../ui/Tag";
import ProjectLink from "./ProjectLink";
import ProjectMedia from "./ProjectMedia";

/** Large editorial row used for the homepage's selected work. */
export default function FeaturedProject({ project, index, reverse = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);
  const caseStudyUrl = project.caseStudy ? `/project-info/${project.slug}` : null;
  const tilt = useTilt({ max: 4 });

  return (
    <motion.article
      ref={ref}
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...tilt.handlers}
      className="group grid items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-14"
    >
      <motion.div variants={fadeUp} className={`relative lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
        <motion.div
          ref={tilt.ref}
          style={tilt.style}
          className="gradient-border relative aspect-[16/10] overflow-hidden rounded-[22px] border border-white/10 bg-ink-800 shadow-frame"
        >
          <motion.div style={project.image ? { y: imageY } : undefined} className={`absolute ${project.image ? "inset-[-6%]" : "inset-0"}`}>
            <ProjectMedia
              project={project}
              className="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.035]"
            />
          </motion.div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          <motion.div aria-hidden="true" style={tilt.glareStyle} className="pointer-events-none absolute inset-0 z-[2]" />
          <div className="absolute left-4 top-4 z-[3] sm:left-5 sm:top-5">
            <StatusBadge project={project} />
          </div>
          {/* Duplicate link on the image, hidden from assistive tech and the tab order. */}
          <ProjectLink project={project} stretched tabIndex={-1} aria-hidden="true" className="absolute inset-0" />
        </motion.div>
      </motion.div>

      <motion.div variants={fadeUp} className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="text-outline font-primary text-5xl font-bold leading-none md:text-6xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>
        <p className="eyebrow mt-7">{project.sector}</p>
        <h3 className="mt-3 font-primary text-[26px] font-semibold leading-tight text-white md:text-[32px] [text-wrap:balance]">
          {project.title}
        </h3>
        <p className="mt-3 font-semibold text-white/55">{project.role}</p>
        <p className="mt-5 text-white/70">{project.description}</p>
        <TagList tags={project.stack} label={`${project.title} technology`} className="mt-6" />
        <div className="mt-8 flex flex-wrap gap-3">
          {caseStudyUrl && (
            <Button to={caseStudyUrl} icon={FiArrowRight} aria-label={`Read the ${project.title} case study`}>
              Read case study
            </Button>
          )}
          {project.liveUrl && (
            <Button href={project.liveUrl} external variant="secondary" icon={FiArrowUpRight}>
              Visit site
            </Button>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}
