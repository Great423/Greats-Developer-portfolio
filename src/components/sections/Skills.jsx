import { FaCss3, FaHtml5, FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoTailwindCss } from "react-icons/bi";
import { SiTypescript } from "react-icons/si";
import { alsoWorkedWith, coreSkills, skillGroups } from "../../data/profile";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { TagList } from "../ui/Tag";

const icons = {
  react: { Icon: FaReact, color: "#61DBFB" },
  next: { Icon: TbBrandNextjs, color: "#ffffff" },
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  javascript: { Icon: IoLogoJavascript, color: "#F0DB4F" },
  tailwind: { Icon: BiLogoTailwindCss, color: "#38BDF8" },
  html: { Icon: FaHtml5, color: "#E34C26" },
  css: { Icon: FaCss3, color: "#2965F1" },
};

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-28">
      <div className="container">
        <SectionHeading index="04" label="skills" title="Technical Skills" id="skills-title" />

        <Reveal as="h3" className="eyebrow mt-14 md:mt-16">
          Core frontend
        </Reveal>
        <RevealGroup
          as="ul"
          stagger={0.05}
          className="mt-5 grid grid-cols-4 overflow-hidden rounded-[20px] border border-white/[0.08] sm:grid-cols-7"
        >
          {coreSkills.map(({ id, name }) => {
            const { Icon, color } = icons[id];
            return (
              <RevealItem
                as="li"
                key={id}
                className="group flex flex-col items-center justify-center gap-3 border-b border-r border-white/[0.08] px-2 py-6 transition-colors duration-500 hover:bg-white/[0.03] sm:border-b-0 sm:py-9 sm:last:border-r-0"
              >
                <Icon
                  aria-hidden="true"
                  style={{ color }}
                  className="h-8 w-8 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:scale-110 sm:h-10 sm:w-10"
                />
                <span className="text-center font-primary text-[9.5px] uppercase tracking-[0.05em] text-white/70 sm:text-[11px] sm:tracking-[0.12em]">
                  {name}
                </span>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.label}>
              <div className="flex items-baseline gap-4 border-b border-white/[0.08] pb-4">
                <span className="text-gradient font-primary text-xs font-semibold">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-primary text-lg font-semibold text-white">{group.label}</h3>
                <span className="ml-auto font-primary text-[11px] text-white/35">{group.items.length}</span>
              </div>
              <TagList tags={group.items} label={group.label} className="mt-5" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-wrap items-center gap-4 text-white/50">
          <h3 className="eyebrow">Also worked with</h3>
          <TagList tags={alsoWorkedWith} size="sm" label="Also worked with" />
        </Reveal>
      </div>
    </section>
  );
}
