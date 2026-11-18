/* eslint-disable react/prop-types */
import { RevealGroup, RevealItem } from "./Reveal";

/**
 * Section opener. The eyebrow keeps the original `<About me/>` code-tag motif
 * from the first version of the site, now used once per section.
 */
export default function SectionHeading({ index, label, title, lead, as = "h2", id, className = "" }) {
  return (
    <RevealGroup className={`max-w-3xl ${className}`}>
      <RevealItem as="p" className="eyebrow flex items-center gap-3">
        {index && <span className="text-gradient font-semibold">{index}</span>}
        {index && <span aria-hidden="true" className="h-px w-8 bg-white/20" />}
        <span>
          <span aria-hidden="true" className="text-brand-pink">&lt;</span>
          {label}
          <span aria-hidden="true" className="text-brand-pink"> /&gt;</span>
        </span>
      </RevealItem>
      <RevealItem as={as} id={id} className="mt-5 font-primary text-title font-semibold text-white [text-wrap:balance]">
        {title}
      </RevealItem>
      {lead && (
        <RevealItem as="p" className="mt-6 max-w-2xl text-lead text-white/65">
          {lead}
        </RevealItem>
      )}
    </RevealGroup>
  );
}
