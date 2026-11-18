// icons
import { FaChevronLeft, FaChevronRight, FaSlash, FaReact, FaHtml5, FaCss3 } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoTailwindCss } from "react-icons/bi";
import { SiTypescript } from "react-icons/si";

// Writing rule: no em dashes or en dashes in this content.
const coreSkills = [
    { name: "React", icon: <FaReact className="text-4xl lg:text-7xl text-[#61DBFB]" /> },
    { name: "Next.js", icon: <TbBrandNextjs className="text-4xl lg:text-7xl" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-4xl lg:text-7xl text-[#3178C6]" /> },
    { name: "JavaScript", icon: <IoLogoJavascript className="text-4xl lg:text-7xl text-[#F0DB4F]" /> },
    { name: "Tailwind CSS", icon: <BiLogoTailwindCss className="text-4xl lg:text-7xl text-[#00b6d7]" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-4xl lg:text-7xl text-[#e34c26]" /> },
    { name: "CSS3", icon: <FaCss3 className="text-4xl lg:text-7xl text-[#264de4]" /> },
];

const skillGroups = [
    {
        label: "Architecture & data",
        items: ["TanStack Query", "Zustand", "REST API Integration", "Supabase", "PostgreSQL & Row Level Security", "JWT Auth & Route Guards", "Role-Based Access", "Code Splitting", "Vite to Next.js Migration", "Database Migrations"],
    },
    {
        label: "UI systems",
        items: ["shadcn/ui", "Radix UI", "Component Architecture", "Responsive & Adaptive Layouts", "Dark Mode", "Framer Motion"],
    },
    {
        label: "Engineering & hardware",
        items: ["Arduino & Microcontrollers", "Circuit Design", "Electrical Fault Diagnosis", "Python for Data Processing"],
    },
    {
        label: "Ways of working",
        items: ["Code Review", "Technical Mentorship", "Documentation", "Git & GitHub", "Collaboration with Backend Engineers"],
    },
];

const alsoWorkedWith = ["jQuery", "Bootstrap"];

export default function Skills() {
  return (
    <section id="skills">
        <div className="container mx-auto space-y-6 lg:space-y-10">
            <h2 className='h2 text-accent text-2xl md:text-[32px] flex items-center'><FaChevronLeft />{`Skills`} <FaSlash className="rotate-90" /><FaChevronRight /></h2>
            <div className="flex flex-wrap md:justify-between items-center gap-4">
                {coreSkills.map(({ name, icon }) => (
                    <span key={name} className="flex flex-col items-center gap-2 md:gap-3 transition-all hover:scale-125">
                        {icon}
                        <h4 className='font-primary text-[11px] lg:text-sm'>{name}</h4>
                    </span>
                ))}
            </div>
            <div className="space-y-6">
                {skillGroups.map(({ label, items }) => (
                    <div key={label} className="space-y-3">
                        <p className="font-primary text-[11px] uppercase tracking-[0.18em] text-white/45">{label}</p>
                        <div className="flex flex-wrap gap-3">
                            {items.map((item) => (
                                <span key={item} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 font-primary text-[11px] uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-white/40 hover:text-white lg:text-xs">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="space-y-3">
                    <p className="font-primary text-[11px] uppercase tracking-[0.18em] text-white/45">Also worked with</p>
                    <div className="flex flex-wrap gap-2">
                        {alsoWorkedWith.map((item) => (
                            <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-primary text-[10px] uppercase tracking-[0.12em] text-white/55">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
