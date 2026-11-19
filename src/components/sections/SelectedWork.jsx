import { FiArrowRight } from "react-icons/fi";
import { featuredProjects, projects } from "../../data/projects";
import { workIntro } from "../../data/site";
import Button from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import FeaturedProject from "../projects/FeaturedProject";

export default function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 md:py-28">
      <div className="container">
        <SectionHeading index="01" label="work" title="Selected Work" lead={workIntro} id="work-title" />

        {/*
          Editorial rows: media and text alternate sides from lg up, and stack
          vertically below it, so every project is found by scrolling.
        */}
        <div data-featured-work="" className="mt-14 space-y-20 sm:space-y-24 md:mt-20 lg:space-y-32">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.slug} project={project} index={index} reverse={index % 2 === 1} />
          ))}
        </div>

        <Reveal className="mt-20 flex flex-col items-start gap-6 border-t border-white/[0.08] pt-10 sm:flex-row sm:items-center sm:justify-between lg:mt-32">
          <p className="max-w-md text-white/60">
            {projects.length - featuredProjects.length} more projects, including Radio Church and live client websites.
          </p>
          <Button to="/projects" magnetic variant="secondary" icon={FiArrowRight}>
            View all projects
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
