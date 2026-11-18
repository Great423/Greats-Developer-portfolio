// icons
import {
  FaChevronLeft,
  FaChevronRight,
  FaSlash,
  FaLaptop,
  FaGasPump,
  FaCode,
  FaIndustry,
} from "react-icons/fa";
// framer motion
import { motion } from "framer-motion";
// fade In
import { fadeIn } from "../variants";

// Writing rule: no em dashes or en dashes in this content.
// Formal employment only. Project contributions are described in the case studies.
const experience = [
  {
    company: "Dataflex",
    role: "NYSC Placement (PPA)",
    dates: "2026 to Present",
    description:
      "IT and technical support: laptop and desktop troubleshooting, device configuration and day-to-day technical assistance for staff.",
    logo: <FaLaptop />,
  },
  {
    company: "FuelupGlobal Enterprise",
    role: "Lead Frontend Software Engineer",
    dates: "2024 to 2025",
    description:
      "Frontend engineering across the whole product: the public marketing website, the role-based customer and rider application, and the separate admin application. Migrated the customer platform from a Vite single-page application to the Next.js App Router, built the ordering flow over a live vendor and product catalogue, and worked with the backend developer on REST API integration.",
    logo: <FaGasPump />,
  },
  {
    company: "Crudpen Technologies Limited",
    role: "Lead Frontend Web Developer",
    dates: "2022 to 2025",
    description:
      "Delivered client products as frontend lead, including the complete customer-facing frontend of Viraleety, a live social media marketing platform. Reviewed code, maintained code quality standards and mentored junior developers.",
    logo: <FaCode />,
  },
  {
    company: "Nigerian Gas Company Limited (NNPC)",
    role: "Engineering Intern",
    dates: "2023 to 2024",
    description:
      "Supported gas distribution and electrical system maintenance, monitored field equipment, maintained engineering logs and applied industrial HSE protocols.",
    logo: <FaIndustry />,
  },
];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container mx-auto">
        <motion.h2
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          className="h2 leading-tight text-accent text-xl md:text-[32px] flex items-center"
        >
          <FaChevronLeft />
          {`Professional Experience`} <FaSlash className="rotate-90" />
          <FaChevronRight />
        </motion.h2>

        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
        >
          {experience.map(({ company, role, dates, description, logo }) => (
            <div
              key={company}
              className="border-b border-white/20 py-6 lg:py-10 flex flex-col lg:flex-row-reverse lg:items-center gap-4"
            >
              <span className="btn lg:bg-transparent xl:bg-inherit w-9 h-9 shrink-0 flex justify-center items-center">
                {logo}
              </span>
              <div className="flex-1 max-w-3xl">
                <h4 className="text-[18px] md:text-[20px] tracking-wider font-primary font-semibold">
                  {company}
                </h4>
                <p className="mt-2 font-primary text-[11px] uppercase tracking-[0.18em] text-white/45">
                  {role} · {dates}
                </p>
                <p className="mt-3 font-secondary leading-tight">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
