/* eslint-disable react/prop-types */
// react router link
import { Link as RouteLink } from 'react-router-dom';
// icons
import { FaArrowRight } from "react-icons/fa";

const WorkCard = ({project}) => {
  const { title, role, image, liveUrl, repoUrl, slug, caseStudy } = project;

  const detailsUrl = caseStudy ? `/project-info/${slug}` : "";
  const externalUrl = detailsUrl ? "" : liveUrl || repoUrl;
  const ctaLabel = detailsUrl
    ? "View details"
    : liveUrl
      ? "Visit site"
      : repoUrl
        ? "View code"
        : "";

  const cardClassName =
    "group relative block overflow-hidden border-2 border-white/50 rounded-xl shadow-xl";

  const content = (
    <>
      <div className="relative h-[324px] w-full overflow-hidden bg-gradient-to-br from-[#2a1350] via-[#1e0b38] to-[#0a0a0a]">
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-primary text-5xl text-white/10"
        >
          {title.charAt(0)}
        </span>
        {/* overlay */}
        <div className="bg-black/70 lg:bg-transparent lg:group-hover:bg-black/70 absolute inset-0 z-40 transition-all duration-300"></div>
        {/* img */}
        {liveUrl && (
          <img
            src={image}
            className="relative h-full w-full object-cover lg:group-hover:scale-125 transition-transform duration-500 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            alt={`${title} project preview`}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        )}
      </div>
      {/* role */}
      <div className="absolute bottom-24 lg:-bottom-full left-2 md:left-12 lg:group-hover:bottom-28 transition-all duration-500 z-50">
        <span className="text-gradient text-sm md:text-base">{role}</span>
      </div>
      {/* title */}
      <div className="absolute bottom-14 lg:-bottom-full left-2 md:left-12 lg:group-hover:bottom-16 transition-all duration-700 z-50">
        <span className="md:text-3xl text-white">{title}</span>
      </div>
      {ctaLabel && (
        <span className="font-primary bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r to-[#FF56F6] via-[#b936ee] from-[#406aff] border border-white text-xs md:text-sm rounded-full px-2 py-1 md:px-4 md:py-2 absolute bottom-4 lg:-bottom-full left-2 md:left-12 lg:group-hover:bottom-4 transition-all duration-700 z-50 flex items-center gap-2">
          {ctaLabel}
          <FaArrowRight aria-hidden="true" />
        </span>
      )}
    </>
  );

  if (detailsUrl) {
    return (
      <RouteLink to={detailsUrl} className={cardClassName}>
        {content}
      </RouteLink>
    );
  }

  if (externalUrl) {
    return (
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
      >
        {content}
      </a>
    );
  }

  return <div className={cardClassName}>{content}</div>;
};

export default WorkCard;
