/*
 * Profile content: about, experience, education, skills and capabilities.
 * Icons are referenced by key and resolved in the components.
 *
 * Writing rule: no em dashes or en dashes anywhere in this content.
 */
export const aboutParagraphs = [
  "I'm Onyenokwe Great Chukwuka, an Electrical & Electronics Engineering graduate (B.Eng., Federal University Otuoke) working as a frontend developer since 2022.",
  "I specialise in React, Next.js and TypeScript. I've owned end-to-end frontend development across three production products in logistics, social media marketing and audio streaming. Most of that work sits where the frontend meets everything else: integrating REST APIs, structuring state for applications that outgrow their first version, building the consoles operators run a business on, and agreeing the data contract with backend engineers before either side builds against it.",
  "I've held Lead Frontend titles at Crudpen Technologies and FuelupGlobal, where I owned frontend architecture decisions, reviewed code and mentored junior developers. I'm currently the sole developer of an internal HR management platform built in Next.js, TypeScript and Supabase, covering the application, the database schema and the authorisation model.",
  "My engineering background isn't a detour from this work. I interned on gas distribution and electrical maintenance at Nigerian Gas Company (NNPC), and for my final-year project I designed and constructed a biometric fingerprint attendance system. When a product involves energy, logistics or field operations, I already understand the system the software is describing.",
];

export const aboutFacts = [
  { label: "Based in", value: "Effurun, Delta State, Nigeria" },
  { label: "Specialism", value: "React, Next.js and TypeScript" },
  { label: "Background", value: "B.Eng. Electrical & Electronics Engineering" },
  { label: "Currently", value: "NYSC placement at Dataflex" },
];

// Formal employment only. Project contributions are described in the case studies.
export const experience = [
  {
    company: "Dataflex",
    role: "NYSC Placement (PPA)",
    dates: "2026 to Present",
    current: true,
    description:
      "IT and technical support: laptop and desktop troubleshooting, device configuration and day-to-day technical assistance for staff.",
  },
  {
    company: "FuelupGlobal Enterprise",
    role: "Lead Frontend Software Engineer",
    dates: "2024 to 2025",
    description:
      "Frontend engineering across the whole product: the public marketing website, the role-based customer and rider application, and the separate admin application. Migrated the customer platform from a Vite single-page application to the Next.js App Router, built the ordering flow over a live vendor and product catalogue, and worked with the backend developer on REST API integration.",
  },
  {
    company: "Crudpen Technologies Limited",
    role: "Lead Frontend Web Developer",
    dates: "2022 to 2025",
    description:
      "Delivered client products as frontend lead, including the complete customer-facing frontend of Viraleety, a live social media marketing platform. Reviewed code, maintained code quality standards and mentored junior developers.",
  },
  {
    company: "Nigerian Gas Company Limited (NNPC)",
    role: "Engineering Intern",
    dates: "2023 to 2024",
    description:
      "Supported gas distribution and electrical system maintenance, monitored field equipment, maintained engineering logs and applied industrial HSE protocols.",
  },
];

export const education = [
  {
    icon: "degree",
    title: "B.Eng. Electrical & Electronics Engineering",
    meta: "Federal University Otuoke, Bayelsa State · 2018/19 to 2024",
  },
  {
    icon: "chip",
    title: "Final-year project: Biometric Fingerprint Attendance System",
    description:
      "Design and construction of a biometric fingerprint attendance system, completed as the final-year engineering project.",
  },
];

export const leadership = [
  {
    icon: "community",
    title: "Assistant Frontend Lead, Google Developer Student Clubs",
    meta: "Federal University Otuoke · 2022 to 2023",
    description:
      "Assistant lead for frontend in the campus developer community, which runs workshops and collaborative projects for students building technical skills.",
  },
  {
    icon: "mentor",
    title: "Technical Mentor, Google Developer Student Clubs",
    description: "Mentored more than 50 students through the GDSC community.",
  },
  {
    icon: "speaker",
    title: "Guest Speaker, YenTown DevCon",
    meta: "Bayelsa Tech Hub, Yenagoa · April 2024",
    description: "Invited guest speaker at the Bayelsa developer conference hosted by Bayelsa Tech Hub.",
  },
];

export const highlights = [
  "B.Eng. Electrical & Electronics Engineering",
  "Federal University Otuoke",
  "GDSC Assistant Frontend Lead",
  "50+ Students Mentored",
  "Conference Speaker, 2024",
];

export const coreSkills = [
  { id: "react", name: "React" },
  { id: "next", name: "Next.js" },
  { id: "typescript", name: "TypeScript" },
  { id: "javascript", name: "JavaScript" },
  { id: "tailwind", name: "Tailwind CSS" },
  { id: "html", name: "HTML5" },
  { id: "css", name: "CSS3" },
];

export const skillGroups = [
  {
    label: "Architecture & data",
    items: [
      "TanStack Query",
      "Zustand",
      "REST API Integration",
      "Supabase",
      "PostgreSQL & Row Level Security",
      "JWT Auth & Route Guards",
      "Role-Based Access",
      "Code Splitting",
      "Vite to Next.js Migration",
      "Database Migrations",
    ],
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

export const alsoWorkedWith = ["jQuery", "Bootstrap"];

export const capabilities = [
  {
    icon: "code",
    title: "Frontend Architecture & Application Development",
    description:
      "I build production React and Next.js applications: component architecture that survives a second feature set, routing and state structured for growth, and performance work against real constraints such as bundle size, render cost and mobile networks.",
  },
  {
    icon: "plug",
    title: "API Integration & Data Layer",
    description:
      "I connect interfaces to the systems behind them: REST API integration, authentication and session handling, payment handoffs, and operational consoles built on live data. I work closely with backend engineers on how the frontend and the API fit together.",
  },
  {
    icon: "lead",
    title: "Technical Leadership & Mentorship",
    description:
      "I've led frontend at two companies, reviewing code, maintaining quality standards and mentoring junior developers. Through GDSC I mentored more than 50 students, and I document what I build so the next person can work in it.",
  },
];
