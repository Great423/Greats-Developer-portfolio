import { FaCode, FaPlug } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { capabilities } from "../../data/profile";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const icons = { code: FaCode, plug: FaPlug, lead: MdManageAccounts };

export default function Capabilities() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 md:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 border-y border-white/[0.05] bg-gradient-to-b from-white/[0.015] via-white/[0.03] to-white/[0.015]" />
      <div className="container">
        <SectionHeading index="06" label="capabilities" title="What I Do" id="services-title" />

        <RevealGroup
          as="ul"
          stagger={0.1}
          className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.08] md:mt-16 md:grid-cols-3"
        >
          {capabilities.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <RevealItem as="li" key={item.title} className="group relative bg-ink-900 p-7 transition-colors duration-500 hover:bg-ink-850 md:p-9">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:rotate-[-4deg]">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="font-primary text-xs text-white/30">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-10 font-primary text-lg font-semibold leading-snug text-white">{item.title}</h3>
                <p className="mt-4 text-white/65">{item.description}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
