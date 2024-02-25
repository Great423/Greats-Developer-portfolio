import React from "react";
// hooks
import { useParams } from "react-router-dom";
// json data
import data from "../data/Data.json";
// react icons
import { FaLink } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
// react scroll
import { Link as BackLink } from 'react-scroll';
// react splide
import { Splide, SplideSlide } from '@splidejs/react-splide';
 // Splide CSS
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
// images
import img2 from '../assets/portfolio-img2.png'
import img3 from '../assets/portfolio-img3.png'

function ProjectInfo() {
  const { id } = useParams();
  const selectedProject = data.find((item, index) => index === parseInt(id));

  const {title, image, description, tools, linkStatus} = selectedProject;

  if(!selectedProject) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div id="project-info">
      <div className="container mx-auto max-w-4xl">
        <div className="header space-y-4 md:space-y-6 mt-10">
          <h1 className="font-semibold text-4xl text-gradient mt-10">{title}</h1>
          {/* summary of what it was built on */}
          <p>This page contains the case study of {title} Open-Source Project which includes the Project Overview,
            Tool Used and Live Links to the official product.</p>
          <button className="btn btn-sm flex items-center gap-1">
            <FaLink className="text-lg"/>
            {linkStatus}
          </button>
          {/* <img src={selectedProject.image} className="h-[12rem] md:h-[20rem] w-full object-cover" alt="" /> */}
          <Splide 
            aria-label="My Favorite Images"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            options={{
              type: "loop",
              autoplay: "true",
              height: "25rem",
              width: "100%",
              breakpoints: {
                640: {
                  height: "12rem",
                },
              },
            }}
          >
            <SplideSlide>
              <img src={image} className="h-full w-full object-cover" alt="Image 1"/>
            </SplideSlide>
            <SplideSlide>
              <img src={img2} className="h-full w-full object-cover" alt="Image 2"/>
            </SplideSlide>
            <SplideSlide>
              <img src={img3} className="h-full w-full object-cover" alt="Image 3"/>
            </SplideSlide>
          </Splide>
        </div>
        {/* about the project */}
        <div className="about space-y-4 md:space-y-6 mt-10">
          <h1 className="font-semibold text-4xl text-gradient">About this project</h1>
          <hr className="border-[#331d5d] w-1/2"/>
          <p>{description}</p>
        </div>
        <div className="technical-sheet space-y-4 md:space-y-6 mt-10">
          <h1 className="font-semibold text-4xl text-gradient">Technical sheet</h1>
          <p>Code technologies I got involved with while working on this project.</p>
          <hr className="border-[#331d5d] w-1/2"/>
          <ul className="space-y-6 list-disc list-inside">
            {tools && tools.map((tool, index) => {
              return (
                <li key={index} className="">{tool}</li>
              )
            })}
          </ul>
        </div>
        {/* technical sheet */}
      </div>
      <BackLink
        to="header"
        smooth={true}
        spy={true} 
        className="active cursor-pointer fixed bottom-8 right-8 w-[45px] h-[45px] z-[100] flex items-center justify-center">
        <IoIosArrowUp />
      </BackLink>
    </div>
  );
}

export default ProjectInfo;
