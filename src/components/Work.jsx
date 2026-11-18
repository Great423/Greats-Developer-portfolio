// react router link
import { Link as RouteLink } from 'react-router-dom';
// project data
import { featuredProjects } from '../data/projects';
// components
import Button from './Button';
import WorkCard from './WorkCard';
// icons
import { FaChevronLeft, FaChevronRight, FaSlash } from "react-icons/fa";

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* text */}
          <div>
            <h2
            className="h2 leading-tight text-accent text-xl md:text-[32px] flex items-center">
                <FaChevronLeft />{`My Latest `} Work <FaSlash className="rotate-90" /><FaChevronRight />
            </h2>
            <p
            className="max-w-sm mb-6">
            Three builds that show the range: the complete frontend of a
            fuel-delivery platform, an internal HR platform I&apos;m building solo,
            and the customer application of a social media marketing product.
            Each one covers the problem, what I built and the stack behind it.
            </p>
            <RouteLink to="/projects" target="_blank">
              <Button text={'View all projects'} className="btn btn-sm" />
            </RouteLink>
          </div>
          {/* featured projects */}
          {featuredProjects.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
