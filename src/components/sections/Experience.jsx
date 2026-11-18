import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { experience } from "../../data/profile";
import { Reveal } from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import GeoAccent from "../ui/GeoAccent";

export default function Experience() {
  const listRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

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

          <ol className="space-y-14 md:space-y-16">
            {experience.map((item) => (
              <Reveal
                as="li"
                key={item.company}
                className="relative grid gap-3 pl-10 md:grid-cols-[13rem_1fr] md:gap-0 md:pl-0"
              >
                <span
                  aria-hidden="true"
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
