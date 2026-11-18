// icons
import {
  FaChevronLeft,
  FaChevronRight,
  FaSlash,
  FaGraduationCap,
  FaMicrochip,
  FaUsers,
  FaChalkboardTeacher,
  FaMicrophone,
} from "react-icons/fa";
// framer motion
import { motion } from "framer-motion";
// fade In
import { fadeIn } from "../variants";

// Writing rule: no em dashes or en dashes in this content.
const education = [
  {
    title: "B.Eng. Electrical & Electronics Engineering",
    meta: "Federal University Otuoke, Bayelsa State · 2018/19 to 2024",
    logo: <FaGraduationCap />,
  },
  {
    title: "Final-year project: Biometric Fingerprint Attendance System",
    description:
      "Design and construction of a biometric fingerprint attendance system, completed as the final-year engineering project.",
    logo: <FaMicrochip />,
  },
];

const leadership = [
  {
    title: "Assistant Frontend Lead, Google Developer Student Clubs",
    meta: "Federal University Otuoke · 2022 to 2023",
    description:
      "Assistant lead for frontend in the campus developer community, which runs workshops and collaborative projects for students building technical skills.",
    logo: <FaUsers />,
  },
  {
    title: "Technical Mentor, Google Developer Student Clubs",
    description: "Mentored more than 50 students through the GDSC community.",
    logo: <FaChalkboardTeacher />,
  },
  {
    title: "Guest Speaker, YenTown DevCon",
    meta: "Bayelsa Tech Hub, Yenagoa · April 2024",
    description:
      "Invited guest speaker at the Bayelsa developer conference hosted by Bayelsa Tech Hub.",
    logo: <FaMicrophone />,
  },
];

const highlights = [
  "B.Eng. Electrical & Electronics Engineering",
  "Federal University Otuoke",
  "GDSC Assistant Frontend Lead",
  "50+ Students Mentored",
  "Conference Speaker, 2024",
];

function EntryList({ entries }) {
  return entries.map(({ title, meta, description, logo }) => (
    <div
      key={title}
      className="border-b border-white/20 py-6 flex flex-col lg:flex-row-reverse lg:items-center gap-4"
    >
      <span className="btn lg:bg-transparent xl:bg-inherit w-9 h-9 shrink-0 flex justify-center items-center">
        {logo}
      </span>
      <div className="flex-1">
        <h4 className="text-[18px] md:text-[20px] tracking-wider font-primary font-semibold">
          {title}
        </h4>
        {meta && (
          <p className="mt-2 font-primary text-[11px] uppercase tracking-[0.18em] text-white/45">
            {meta}
          </p>
        )}
        {description && (
          <p className="mt-3 font-secondary leading-tight">{description}</p>
        )}
      </div>
    </div>
  ));
}

export default function EducationAchievements() {
  return (
    <section className="section" id="education">
      <div className="container mx-auto">
        <motion.h2
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          className="h2 leading-tight text-accent text-xl md:text-[32px] flex items-center"
        >
          <FaChevronLeft />
          {`Education & Achievements`} <FaSlash className="rotate-90" />
          <FaChevronRight />
        </motion.h2>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
          >
            <h3 className="h3 !mb-2">Education</h3>
            <EntryList entries={education} />
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
          >
            <h3 className="h3 !mb-2">Leadership &amp; Community</h3>
            <EntryList entries={leadership} />
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView={"show"}
          className="mt-10 flex flex-wrap gap-3"
        >
          {highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 font-primary text-[11px] uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-white/40 hover:text-white lg:text-xs"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
