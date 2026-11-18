/* eslint-disable react/prop-types */
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { socials } from "../../data/site";

const icons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  facebook: FaFacebookF,
};

export default function SocialLinks({ className = "", size = "md" }) {
  const box = size === "sm" ? "h-10 w-10 text-[15px]" : "h-11 w-11 text-base";
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {socials.map(({ id, label, href }) => {
        const Icon = icons[id];
        return (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className={`grid ${box} place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-brand-pink/50 hover:text-white hover:shadow-glow-sm`}
            >
              <Icon aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
