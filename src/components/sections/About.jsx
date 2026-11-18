import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { aboutFacts, aboutParagraphs } from "../../data/profile";
import { links } from "../../data/site";
import { scaleIn } from "../../lib/motion";
import Button from "../ui/Button";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import workingImage from "/assets/working.jpg";

export default function About() {
  const imageRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  const [lead, ...rest] = aboutParagraphs;

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-28">
      <div className="container grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading index="02" label="about" title="Hi there! 👋" id="about-title" />
          <Reveal variants={scaleIn} className="mt-10 lg:mt-14">
            <div
              ref={imageRef}
              className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/10 bg-ink-800 shadow-frame sm:aspect-[16/11] lg:aspect-[4/5]"
            >
              <motion.img
                src={workingImage}
                alt="A developer workspace with code on screen"
                width="1080"
                height="1440"
                loading="lazy"
                decoding="async"
                style={{ y: imageY }}
                className="absolute inset-[-10%] h-[120%] w-[120%] max-w-none object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div aria-hidden="true" className="absolute inset-0 mix-blend-soft-light bg-brand-gradient opacity-40" />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-[7.5rem]">
          <Reveal as="p" className="font-secondary text-[22px] font-semibold leading-snug text-white md:text-[28px] [text-wrap:pretty]">
            {lead}
          </Reveal>
          <RevealGroup className="mt-8 space-y-6 text-white/70">
            {rest.map((paragraph) => (
              <RevealItem as="p" key={paragraph.slice(0, 24)}>
                {paragraph}
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup as="dl" className="mt-12 grid border-t border-white/[0.08] sm:grid-cols-2">
            {aboutFacts.map((fact) => (
              <RevealItem key={fact.label} className="border-b border-white/[0.08] py-5 sm:odd:pr-6 sm:even:border-l sm:even:pl-6">
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-2 font-semibold text-white">{fact.value}</dd>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10">
            <Button href={links.cvDownload} download variant="secondary" icon={FiDownload}>
              Download CV
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
