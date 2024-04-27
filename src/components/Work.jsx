import React from "react";
// react router link
import { Link as RouteLink } from 'react-router-dom';
// json data
import projectsData from '../data/Data.json';
// icons
import { FaChevronLeft, FaChevronRight, FaSlash, FaArrowRight } from "react-icons/fa";

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
            Explore the projects below to gain insights into the design aesthetics, 
            functionalities, and the technologies employed in their development. 
            Click on each project to discover more about its purpose, features, and the 
            frontend technologies utilized to bring it to life.
            </p>
            <div
            >
              <RouteLink to="/projects" target="_blank">
                <button className="btn btn-sm">View all projects</button>
              </RouteLink>
            </div>
          </div>
          {/* image */}
          {projectsData && projectsData.slice(0, 3).map((project, index) => {
            const { title, preTitle, image } = project;
            return (
              <RouteLink to={`/project-info/${index}`} key={index} target="_blank" className="shadow-xl">
                <div
                key={index} className="group relative overflow-hidden border-2 border-white/50 rounded-xl">
                  {/* overlay */}
                  <div className="bg-black/70 lg:bg-transparent lg:group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300"></div>
                  {/* img */}
                  <img src={`./src/assets/${image}`} className="lg:group-hover:scale-125 transition-all duration-500 object-cover h-[324px] w-full" alt="" />
                  {/* pretitle */}
                  <div className="absolute bottom-24 lg:-bottom-full left-2 md:left-12 lg:group-hover:bottom-28 transition-all duration-500 z-50">
                    <span className="text-gradient text-sm md:text-base">{preTitle}</span>
                  </div>
                  {/* title */}
                  <div className="absolute bottom-14 lg:-bottom-full left-2 md:left-12 lg:group-hover:bottom-16 transition-all duration-700 z-50">
                    <span className="md:text-3xl text-white">{title}</span>
                  </div>
                  <button className="font-primary hover:bg-gradient-to-r to-[#FF56F6] via-[#b936ee] from-[#406aff] border border-white text-xs md:text-sm rounded-full px-2 py-1 md:px-4 md:py-2 absolute bottom-4 lg:-bottom-full left-2 md:left-12 lg:group-hover:bottom-4 transition-all duration-700 z-50 flex items-center gap-2">View project<FaArrowRight /></button>
                </div>
              </RouteLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}
