import { FaChalkboardTeacher, FaGraduationCap, FaMicrochip, FaMicrophone, FaUsers } from "react-icons/fa";
import { education, highlights, leadership } from "../../data/profile";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const icons = {
  degree: FaGraduationCap,
  chip: FaMicrochip,
  community: FaUsers,
  mentor: FaChalkboardTeacher,
  speaker: FaMicrophone,
};

const groups = [
  { id: "education-list", title: "Education", items: education },
  { id: "leadership-list", title: "Leadership & Community", items: leadership },
];

export default function EducationAchievements() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-24 md:py-28">
      <div className="container">
        <SectionHeading index="05" label="education" title="Education & Achievements" id="education-title" />

        <div className="mt-14 grid gap-14 md:mt-16 lg:grid-cols-2 lg:gap-16">
          {groups.map((group) => (
            <div key={group.id}>
              <Reveal as="h3" className="flex items-center gap-3 font-primary text-lg font-semibold text-white" id={group.id}>
                <span aria-hidden="true" className="h-4 w-1 rounded-full bg-brand-gradient" />
                {group.title}
              </Reveal>
              <RevealGroup as="ul" aria-labelledby={group.id} className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {group.items.map((item) => {
                  const Icon = icons[item.icon];
                  return (
                    <RevealItem as="li" key={item.title} className="group flex gap-5 py-6">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-brand-pink transition-colors duration-500 group-hover:border-brand-pink/40 group-hover:bg-brand-pink/10">
                        <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                      </span>
                      <div>
                        <h4 className="font-primary text-base font-semibold leading-snug text-white md:text-[17px]">{item.title}</h4>
                        {item.meta && <p className="eyebrow mt-2 leading-relaxed">{item.meta}</p>}
                        {item.description && <p className="mt-3 text-white/65">{item.description}</p>}
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          ))}
        </div>

        <RevealGroup as="ul" aria-label="Highlights" stagger={0.05} className="mt-12 flex flex-wrap gap-2.5">
          {highlights.map((item) => (
            <RevealItem
              as="li"
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-primary text-[10.5px] uppercase tracking-[0.12em] text-white/75"
            >
              {item}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
