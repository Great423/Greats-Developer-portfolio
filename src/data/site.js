/*
 * Site-wide identity, links and navigation. One source for the header,
 * hero, contact section and footer.
 *
 * Writing rule: no em dashes or en dashes anywhere in this content.
 */
export const person = {
  name: "Onyenokwe Great Chukwuka",
  positioning: ["Electrical & Electronics Engineer", "Lead Frontend Developer"],
  email: "chukwukaonyenokwe@gmail.com",
  location: "Effurun, Delta State, Nigeria",
  remote: "Open to remote",
  availability: "Open to frontend engineering roles",
};

export const links = {
  cvDownload: "/Great-Onyenokwe-CV.pdf",
  cvOnline: "http://chukwukaonyenokwe.cv/",
};

export const socials = [
  { id: "github", label: "GitHub", href: "https://github.com/Great423/" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/onyenokwe-great-4028a122a/" },
  { id: "x", label: "X (Twitter)", href: "https://x.com/COnyenokwe40411" },
  { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/2349124160236" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/great.onyenokwe/" },
  { id: "facebook", label: "Facebook", href: "https://web.facebook.com/chukwuka.onyenokwe" },
];

/** Homepage sections that appear in the navigation, in page order. */
export const navItems = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const heroRoles = ["Frontend Engineer", "React & Next.js Developer", "Electrical Engineer"];

export const heroIntro =
  "I've owned end-to-end frontend development across three production products in logistics, social media marketing and audio streaming, and I'm the sole developer of an internal HR platform built in Next.js, TypeScript and Supabase. My focus is frontend architecture, API integration and the parts that have to work when the network doesn't.";

export const stats = [
  { value: 4, suffix: "+", label: "Years of experience" },
  { value: 3, suffix: "", label: "Production frontends" },
  { value: 50, suffix: "+", label: "Students mentored" },
];

export const workIntro =
  "Three builds that show the range: the complete frontend of a fuel-delivery platform, an internal HR platform I'm building solo, and the customer application of a social media marketing product. Each one covers the problem, what I built and the stack behind it.";

export const projectsIntro =
  "Production platforms, internal systems and client websites, with the problem, my contribution and the stack for each.";

export const contactIntro =
  "I'm open to frontend engineering roles, contract work and collaboration. My strongest fit is React and Next.js products with real integration work behind them, and anything touching energy, logistics or field operations, where my engineering background does double duty.";
