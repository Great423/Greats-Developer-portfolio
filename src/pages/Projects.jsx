// hooks
import React, { useEffect } from "react";
// json data
import projectsData from '../data/Data.json';
// icons
import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
// react scroll
import { Link as BackLink } from 'react-scroll';
// react router
import { Link as Link } from 'react-router-dom';

export default function Projects() {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <div id="projects" className="projects">
      <div className="container mx-auto space-y-6">
        <div className="text-center mt-10 space-y-4">
          <h1 className="font-semibold text-4xl text-gradient">Projects.</h1>
          <h4 className="text-xl">Selected work I've taken on in the past.</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            projectsData && projectsData.map((project, index) => {
              const { title, preTitle, image } = project;
              return (
                <Link to={`/project-info/${index}`} key={index} target="_blank" className="shadow-xl">
                  <div className="group relative overflow-hidden">
                    {/* preTitle */}
                    <span className="absolute top-4 left-4 text-xs z-[100] rounded-full bg-black/80 px-4 py-1">{preTitle}</span>
                    {/* overlay */}
                    <div className="md:group-hover:bg-black/50 md:bg-black/30 bg-black/30 w-full h-full absolute z-40 transition-all duration-300"></div>
                    {/* img */}
                    <img loading="lazy" src={`/src/assets/${image}`} className="md:group-hover:scale-125 transition-all duration-500 object-cover h-[300px] w-full" alt={title} />  
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    {/* title */}
                    <p className="text-gradient text-[15px] md:text-base">{title}</p>
                    <button className="font-primary hover:bg-gradient-to-r to-[#FF56F6] via-[#b936ee] from-[#406aff] border border-white/50 text-white/50 text-[9.5px] md:text-xs rounded-full px-2 py-0.5 md:px-4 md:py-2 flex items-center gap-2">
                      View Details<FaArrowRight />
                    </button>
                  </div>
                </Link>
              )
            })
          }
        </div>
        <BackLink
          to="header"
          smooth={true}
          spy={true} 
          className="active cursor-pointer fixed bottom-8 right-8 w-[45px] h-[45px] z-[100] flex items-center justify-center">
          <IoIosArrowUp />
        </BackLink>
      </div>
    </div>
  );
} 
