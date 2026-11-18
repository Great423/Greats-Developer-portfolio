/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cardPress } from "../../lib/motion";
import Button from "../ui/Button";
import StatusBadge from "../ui/StatusBadge";
import { TagList } from "../ui/Tag";
import ProjectLink from "./ProjectLink";
import ProjectMedia from "./ProjectMedia";

const pad = (value) => String(value).padStart(2, "0");

/**
 * One slide. Slides away from their snap point ease down in scale and
 * opacity, driven by the scroller's own horizontal progress (no listeners).
 * `stops` holds each slide's measured snap position as scroll progress.
 */
function Slide({ project, index, total, progress, stops, reduce }) {
  const at = stops[index];
  const before = index > 0 ? stops[index - 1] : at - ((stops[index + 1] ?? at + 1) - at);
  const after = index < total - 1 ? stops[index + 1] : at + (at - (stops[index - 1] ?? at - 1));
  const range = [before, at, after];
  const scale = useTransform(progress, range, [0.94, 1, 0.94]);
  const opacity = useTransform(progress, range, [0.5, 1, 0.5]);
  const caseStudyUrl = project.caseStudy ? `/project-info/${project.slug}` : null;

  return (
    <motion.div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${project.title}`}
      data-slide={index}
      style={reduce ? undefined : { scale, opacity }}
      className="flex w-[86%] max-w-[460px] shrink-0 snap-start flex-col sm:w-[72%] md:w-[62%]"
    >
      <motion.div
        {...cardPress}
        className="group relative aspect-[16/10] overflow-hidden rounded-[20px] border border-white/10 bg-ink-800 shadow-frame"
      >
        <ProjectMedia project={project} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <div className="absolute left-3.5 top-3.5 z-[3]">
          <StatusBadge project={project} />
        </div>
        <ProjectLink project={project} stretched tabIndex={-1} aria-hidden="true" className="absolute inset-0" />
      </motion.div>

      <div className="flex flex-1 flex-col pt-6">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="text-outline font-primary text-3xl font-bold leading-none">
            {pad(index + 1)}
          </span>
          <p className="eyebrow">{project.sector}</p>
        </div>
        <h3 className="mt-4 font-primary text-[22px] font-semibold leading-tight text-white [text-wrap:balance]">
          {project.title}
        </h3>
        <p className="mt-2 font-semibold text-white/55">{project.role}</p>
        <p className="mt-4 text-white/70">{project.description}</p>
        <TagList tags={project.stack} size="sm" label={`${project.title} technology`} className="mt-5" />
        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          {caseStudyUrl && (
            <Button to={caseStudyUrl} icon={FiArrowRight} aria-label={`Read the ${project.title} case study`}>
              Case study
            </Button>
          )}
          {project.liveUrl && (
            <Button href={project.liveUrl} external variant="secondary" icon={FiArrowUpRight}>
              Visit site
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Featured projects as a swipeable row on phones and tablets.
 * Native horizontal scrolling with snap points: the browser locks each
 * gesture to one axis, so vertical page scrolling is never captured.
 * Buttons, dots and arrow keys give the same control without swiping.
 */
export default function FeaturedCarousel({ projects }) {
  const scrollerRef = useRef(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const total = projects.length;
  const { scrollXProgress } = useScroll({ container: scrollerRef });
  const [stops, setStops] = useState(() => projects.map((_, i) => (total > 1 ? i / (total - 1) : 0)));

  // Measure where each slide actually snaps (the last one snaps to the end
  // of the track), so the centred slide is exactly full strength.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;
    const measure = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      if (max <= 0) return;
      const padding = parseFloat(getComputedStyle(scroller).paddingLeft) || 0;
      const next = [...scroller.querySelectorAll("[data-slide]")].map((slide) =>
        Math.min(1, Math.max(0, (slide.offsetLeft - padding) / max))
      );
      setStops((previous) => (previous.every((value, i) => Math.abs(value - next[i]) < 0.001) ? previous : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(scroller);
    return () => observer.disconnect();
  }, [total]);

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    let nearest = 0;
    stops.forEach((stop, i) => {
      if (Math.abs(stop - value) < Math.abs(stops[nearest] - value)) nearest = i;
    });
    setIndex(nearest);
  });

  const goTo = (target) => {
    const scroller = scrollerRef.current;
    const next = Math.max(0, Math.min(total - 1, target));
    const slide = scroller?.querySelector(`[data-slide="${next}"]`);
    if (!slide) return;
    const padding = parseFloat(getComputedStyle(scroller).paddingLeft) || 0;
    scroller.scrollTo({ left: slide.offsetLeft - padding, behavior: reduce ? "auto" : "smooth" });
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  const arrowClass =
    "grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-[border-color,background-color,opacity] duration-300 hover:border-white/30 hover:bg-white/[0.08] disabled:opacity-30";

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Featured projects" onKeyDown={onKeyDown}>
      <div
        ref={scrollerRef}
        data-carousel-scroller=""
        className="scrollbar-none relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-2 md:-mx-8 md:scroll-px-8 md:px-8"
      >
        {projects.map((project, slideIndex) => (
          <Slide
            key={project.slug}
            project={project}
            index={slideIndex}
            total={total}
            progress={scrollXProgress}
            stops={stops}
            reduce={reduce}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="font-primary text-[12px] tracking-[0.16em] text-white/50" aria-hidden="true">
          <span className="text-white">{pad(index + 1)}</span> / {pad(total)}
        </p>

        <div className="flex items-center">
          {projects.map((project, dotIndex) => {
            const current = dotIndex === index;
            return (
              <button
                key={project.slug}
                type="button"
                onClick={() => goTo(dotIndex)}
                aria-label={`Show project ${dotIndex + 1} of ${total}: ${project.title}`}
                aria-current={current ? "true" : undefined}
                className="group grid h-11 w-8 place-items-center"
              >
                <motion.span
                  aria-hidden="true"
                  animate={{ width: current ? 22 : 6, opacity: current ? 1 : 0.4 }}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="block h-1.5 rounded-full bg-brand-gradient group-hover:opacity-80"
                />
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous project"
            className={arrowClass}
          >
            <FiChevronLeft aria-hidden="true" className="h-5 w-5" />
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => goTo(index + 1)}
            disabled={index === total - 1}
            aria-label="Next project"
            className={arrowClass}
          >
            <FiChevronRight aria-hidden="true" className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing project {index + 1} of {total}: {projects[index].title}
      </p>
    </div>
  );
}
