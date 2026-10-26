// icons
import { FaChevronLeft, FaChevronRight, FaSlash, FaReact, FaHtml5, FaCss3, FaBootstrap } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoTailwindCss, BiLogoJquery } from "react-icons/bi";
import { SiTypescript, SiSupabase } from "react-icons/si";

export default function Skills() {
  return (
    <section id="skills">
        <div className="container mx-auto space-y-6 lg:space-y-10">
            <h2 className='h2 text-accent text-2xl md:text-[32px] flex items-center'><FaChevronLeft />{`Skills`} <FaSlash className="rotate-90" /><FaChevronRight /></h2>
            <div className="flex flex-wrap md:justify-between items-center gap-4">
                <span className="flex flex-col items-center gap-2 md:gap-3 transition-all hover:scale-125">
                    <FaHtml5 className="text-4xl lg:text-7xl text-[#e34c26]" />
                    <h4 className='font-primary text-[11px] lg:text-sm'>HTML5</h4>
                </span>
                <span className="flex flex-col items-center gap-2 md:gap-3 transition-all hover:scale-125">
                    <FaCss3 className="text-4xl lg:text-7xl text-[#264de4]" />
                    <h4 className='font-primary text-[11px] lg:text-sm'>CSS3</h4>
                </span>
                <span className="flex flex-col items-center gap-2 md:gap-3 transition-all hover:scale-125">
                    <IoLogoJavascript className="text-4xl lg:text-7xl text-[#F0DB4F]" />
                    <h4 className='font-primary text-[11px] lg:text-sm'>Javascript</h4>
                </span>
                <span className="flex flex-col items-center gap-2 md:gap-3 transition-all hover:scale-125">
                    <SiTypescript className="text-4xl lg:text-7xl text-[#3178C6]" />
                    <h4 className='font-primary text-[11px] lg:text-sm'>TypeScript</h4>
                </span>
                <span className="flex flex-col items-center gap-2 md:gap-3 transition-all hover:scale-125">
                    <BiLogoJquery className="text-4xl lg:text-7xl text-[#F0DB4F]"  />
                    <h4 className='font-primary text-[11px] lg:text-sm'>Jquery</h4>
                </span>
                <span className="flex flex-col items-center gap-2 md:gap-3 transition-all hover:scale-125">
                    <FaBootstrap className="text-4xl lg:text-7xl text-[#7d11f9]" />
                    <h4 className='font-primary text-[11px] lg:text-sm'>Bootstrap</h4>
                </span>
                <span className="flex flex-col items-center gap-2 md:gap-3 transition-all hover:scale-125">
                    <BiLogoTailwindCss className="text-4xl lg:text-7xl text-[#00b6d7]" />
                    <h4 className='font-primary text-[11px] lg:text-sm'>Tailwindcss</h4>
                </span>
                <span className="flex flex-col items-center gap-2 md:gap-3 transition-all hover:scale-125">
                    <FaReact className="text-4xl lg:text-7xl text-[#61DBFB]" />
                    <h4 className='font-primary text-[11px] lg:text-sm'>React Js</h4>
                </span>
                <span className="flex flex-col items-center gap-2 md:gap-3 transition-all hover:scale-125">
                    <TbBrandNextjs className="text-4xl lg:text-7xl" />
                    <h4 className='font-primary text-[11px] lg:text-sm'>Next Js</h4>
                </span>
                <span className="flex flex-col items-center gap-2 md:gap-3 transition-all hover:scale-125">
                    <SiSupabase className="text-4xl lg:text-7xl text-[#3ECF8E]" />
                    <h4 className='font-primary text-[11px] lg:text-sm'>Supabase</h4>
                </span>
            </div>
            <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 font-primary text-[11px] uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-white/40 hover:text-white lg:text-xs">
                    Frontend Performance Optimization
                </span>
                <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 font-primary text-[11px] uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-white/40 hover:text-white lg:text-xs">
                    Responsive Web Design
                </span>
                <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 font-primary text-[11px] uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-white/40 hover:text-white lg:text-xs">
                    State Management (Zustand)
                </span>
            </div>
        </div>
    </section>
  );
}
