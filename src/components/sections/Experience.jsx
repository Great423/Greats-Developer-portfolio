import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { experience } from "../../data/profile";
import { Reveal } from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import GeoAccent from "../ui/GeoAccent";

export default function Experience() {
  const listRef = useRef(null);
  const reduce = useReducedMotion();
  // The fill's leading edge tracks a line 60% down the viewport, and each
  // dot lights up as it crosses that same line, so the two stay in step.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const headTop = useTransform(progress, (value) => `${Math.min(1, Math.max(0, value)) * 100}%`);
  const headOpacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-28">
      <GeoAccent id="experience" className="absolute right-[6%] top-16 -z-10 hidden h-56 w-56 opacity-60 lg:block xl:h-64 xl:w-64" />
      <div className="container">
        <SectionHeading index="03" label="experience" title="Professional Experience" id="experience-title" />

        <div ref={listRef} className="relative mt-14 md:mt-20">
          {/* Rail with a gradient that fills as the timeline scrolls past. */}
          <div aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-white/10 md:left-[calc(13rem+7px)]" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : progress }}
            className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-gradient-to-b from-brand-blue via-brand-violet to-brand-pink md:left-[calc(13rem+7px)]"
          />
          {!reduce && (
            <div aria-hidden="true" className="pointer-events-none absolute bottom-3 left-[7px] top-3 w-px md:left-[calc(13rem+7px)]">
              <motion.span
                style={{ top: headTop, opacity: headOpacity }}
                className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-pink shadow-[0_0_14px_4px_rgba(255,86,246,0.55)]"
              />
            </div>
          )}

          <ol className="space-y-14 md:space-y-16">
            {experience.map((item) => (
              <Reveal
                as="li"
                key={item.company}
                className="relative grid gap-3 pl-10 md:grid-cols-[13rem_1fr] md:gap-0 md:pl-0"
              >
                <motion.span
                  aria-hidden="true"
                  initial={reduce ? false : { scale: 0.7, opacity: 0.35, boxShadow: "0 0 0 0 rgba(255,86,246,0)" }}
                  whileInView={{ scale: 1, opacity: 1, boxShadow: "0 0 18px 2px rgba(255,86,246,0.45)" }}
                  viewport={{ once: false, margin: "100% 0px -40% 0px" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-[3px] border-ink bg-brand-gradient ring-1 ring-white/25 md:left-[13rem]"
                />
                <div className="md:pr-12 md:pt-0.5 md:text-right">
                  <p className="font-primary text-[12px] font-medium uppercase tracking-[0.16em] text-white/70">{item.dates}</p>
                  {item.current && (
                    <p className="mt-2 inline-flex rounded-full border border-brand-pink/30 bg-brand-pink/10 px-2.5 py-0.5 font-primary text-[10px] uppercase tracking-[0.16em] text-brand-pink">
                      Current
                    </p>
                  )}
                </div>
                <div className="md:pl-14">
                  <h3 className="font-primary text-xl font-semibold leading-snug text-white md:text-2xl">{item.company}</h3>
                  <p className="text-gradient mt-1.5 inline-block font-semibold">{item.role}</p>
                  <p className="mt-4 max-w-2xl text-white/70">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
