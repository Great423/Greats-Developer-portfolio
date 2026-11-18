import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiArrowUpRight, FiDownload } from "react-icons/fi";
import { heroIntro, heroRoles, links, person, stats } from "../../data/site";
import { ease, fadeUp, maskReveal, scaleIn, staggerContainer } from "../../lib/motion";
import AnimatedNumber from "../ui/AnimatedNumber";
import Button from "../ui/Button";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import SocialLinks from "../ui/SocialLinks";
import HeroScene from "../hero/HeroScene";
import usePointerParallax from "../../hooks/usePointerParallax";
import portrait from "/assets/about2.png";

function RoleRotator() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const timer = setInterval(() => setIndex((value) => (value + 1) % heroRoles.length), 2800);
    return () => clearInterval(timer);
  }, [reduce]);

  const spoken = `I am a ${heroRoles.slice(0, -1).join(", ")} and ${heroRoles.at(-1)}.`;

  if (reduce) {
    return (
      <p className="font-primary text-sm uppercase tracking-[0.14em] text-white/70">
        {heroRoles.join(" · ")}
      </p>
    );
  }

  return (
    <p className="flex flex-wrap items-baseline gap-x-2.5 font-primary text-sm uppercase tracking-[0.14em] text-white/55 md:text-[15px]">
      <span className="sr-only">{spoken}</span>
      <span aria-hidden="true">I am a</span>
      <span aria-hidden="true" className="relative inline-flex h-[1.5em] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={heroRoles[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.55, ease: ease.out }}
            className="text-gradient inline-block whitespace-nowrap font-semibold"
          >
            {heroRoles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.25]);
  const visualRef = useRef(null);
  const pointer = usePointerParallax(visualRef);
  const tiltX = useTransform(pointer.y, [-1, 1], [6, -6]);
  const tiltY = useTransform(pointer.x, [-1, 1], [-8, 8]);
  const chipNearX = useTransform(pointer.x, [-1, 1], [-14, 14]);
  const chipNearY = useTransform(pointer.y, [-1, 1], [-10, 10]);
  const chipFarX = useTransform(pointer.x, [-1, 1], [18, -18]);
  const chipFarY = useTransform(pointer.y, [-1, 1], [12, -12]);
  const nameWords = person.name.split(" ");

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+2.5rem)] md:pb-20 md:pt-[calc(var(--header-h)+4rem)]"
    >
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
          <motion.div
            variants={staggerContainer(0.09, 0.1)}
            initial="hidden"
            animate="show"
            className="order-2 lg:order-1"
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2.5 pr-4 text-[15px] text-white/75 backdrop-blur-sm"
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-pink shadow-[0_0_12px_2px_rgba(255,86,246,0.6)]" />
              {person.availability}
            </motion.p>

            <motion.p variants={fadeUp} className="eyebrow mt-8 text-white/60">
              Hello, world!{" "}
              <span aria-hidden="true" className="inline-block origin-[70%_70%] animate-waveHand">
                👋
              </span>{" "}
              I&apos;m
            </motion.p>

            <h1 id="hero-title" className="mt-4 font-secondary text-display font-bold text-white">
              {nameWords.map((word, index) => (
                <Fragment key={word}>
                  <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                    <motion.span variants={maskReveal} className="inline-block">
                      {word}
                    </motion.span>
                  </span>
                  {index < nameWords.length - 1 && " "}
                </Fragment>
              ))}
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 font-primary text-[13px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-white/85 md:text-[15px]"
            >
              <span className="block">
                {person.positioning[0]}
                <span className="sr-only"> | </span>
              </span>
              <span className="text-gradient block">{person.positioning[1]}</span>
            </motion.p>

            <motion.div variants={fadeUp} className="mt-3">
              <RoleRotator />
            </motion.div>

            <motion.p variants={fadeUp} className="mt-7 max-w-[34rem] text-lead text-white/70">
              {heroIntro}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button to={{ pathname: "/", hash: "#contact" }} icon={FiArrowRight}>
                Contact me
              </Button>
              <Button href={links.cvDownload} download variant="secondary" icon={FiDownload}>
                Download CV
              </Button>
              <Button href={links.cvOnline} external variant="ghost" icon={FiArrowUpRight} className="self-start sm:self-auto">
                View online CV
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-9">
              <SocialLinks />
            </motion.div>
          </motion.div>

          <motion.div
            ref={visualRef}
            style={{ y: portraitY }}
            className="relative order-1 mx-auto w-[min(64vw,270px)] sm:w-[320px] lg:order-2 lg:w-full lg:max-w-[420px]"
          >
            <motion.div variants={scaleIn} initial="hidden" animate="show" className="relative aspect-square">
              <motion.div
                aria-hidden="true"
                style={{ scale: glowScale }}
                className="absolute -inset-[12%] rounded-full bg-brand-gradient opacity-20 blur-3xl"
              />

              {/* Layer 1: WebGL circuit halo, larger than the portrait and behind it. */}
              <HeroScene className="absolute -inset-[30%] z-0" />

              {/* Layer 2: the portrait, tilting gently towards the pointer. */}
              <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }} className="absolute inset-0 z-10">
                <div aria-hidden="true" className="absolute inset-0 rounded-full bg-brand-ring shadow-glow" />
                <div className="absolute inset-[3px] overflow-hidden rounded-full bg-ink-850">
                  <img
                    src={portrait}
                    alt={`Portrait of ${person.name}`}
                    width="1126"
                    height="1093"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div aria-hidden="true" className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(10,10,10,0.6)]" />
                </div>
              </motion.div>

              {/* Layer 3: chips drift further than the portrait for depth. */}
              <motion.div style={{ x: chipNearX, y: chipNearY }} className="absolute -left-2 top-[10%] z-20 sm:-left-6">
                <motion.p
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.9, duration: 0.8, ease: ease.out } }}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-ink/80 px-3.5 py-2 font-primary text-[10px] uppercase tracking-[0.14em] text-white/85 shadow-frame backdrop-blur-md md:text-[11px]"
                >
                  React · Next.js · TypeScript
                </motion.p>
              </motion.div>
              <motion.div style={{ x: chipFarX, y: chipFarY }} className="absolute -right-1 bottom-[11%] z-20 sm:-right-4">
                <motion.p
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 1.05, duration: 0.8, ease: ease.out } }}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-ink/80 px-3.5 py-2 font-primary text-[10px] uppercase tracking-[0.14em] text-white/85 shadow-frame backdrop-blur-md md:text-[11px]"
                >
                  <span className="text-gradient font-semibold">B.Eng.</span> Electrical &amp; Electronics
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <RevealGroup
          as="dl"
          stagger={0.1}
          className="mt-16 grid grid-cols-3 border-y border-white/[0.08] md:mt-20"
        >
          {stats.map((stat, index) => (
            <RevealItem
              key={stat.label}
              className={`flex flex-col-reverse gap-2 py-6 md:py-8 ${index > 0 ? "border-l border-white/[0.08] pl-4 sm:pl-8" : "pr-4"}`}
            >
              <dt className="eyebrow text-[10px] leading-snug sm:text-[11px]">{stat.label}</dt>
              <dd className="text-gradient font-tertiary text-[34px] leading-none sm:text-5xl md:text-6xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
