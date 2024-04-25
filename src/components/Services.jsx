import React from "react";
// icons
import { FaCode, FaChevronLeft, FaChevronRight, FaSlash, FaPaintBrush } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
// framer motion
import { motion } from 'framer-motion';
// fade In
import { fadeIn } from '../variants';
// react scroll link
import { Link } from 'react-scroll';

export default function Services() {
  // services data
const services = [
  {
    name: 'Web Design',
    description: `Crafting visually appealing and intuitive interfaces to enhance 
    the overall user experience and engagement.`,
    logo: <FaPaintBrush />,
  },
  {
    name: 'Web Development',
    description: `Building responsive and user-friendly websites with a focus
    on clean code and optimal performance.`,
    logo: <FaCode />,
  },
  {
    name: 'Project Management',
    description: `As a web development project manager, I plan goals, coordinate tasks, 
     timelines and budgets, ensure quality, and provide ongoing client support. 
     My role is to guide projects efficiently from conception to completion, prioritizing client satisfaction at every step.`,
     logo: <MdManageAccounts />
    },
];
  return (
    <section className="section" id="services">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* text */}
          <div className="flex-1 w-full xl:bg-services bg-no-repeat mix-blend-lighten mb-6 lg:mb-12" style={{backgroundPosition: '8rem 5rem'}}>
            <motion.h2
            variants={fadeIn('left', 0.1)}
            initial='hidden'
            whileInView={'show'}
             className="h2 text-accent mb-6 text-2xl md:text-[32px] flex items-center"><FaChevronLeft />{`What I Do `} <FaSlash className="rotate-90" /><FaChevronRight /></motion.h2>
            <motion.h3
            variants={fadeIn('right', 0.2)}
            initial='hidden'
            whileInView={'show'}
             className="h3 max-w-[455px] mb-6">
              I'm a Freelance Front-end Developer with over 5 years of experience
            </motion.h3>
            <Link to="work">
              <motion.button
              variants={fadeIn('left', 0.3)}
              initial='hidden'
              whileInView={'show'}
              className="btn btn-sm">See my work</motion.button>
            </Link>
          </div>
          <hr className="border-[#785bac] md:hidden"/>
          {/* services */}
          <motion.div
          variants={fadeIn('left', 0.1)}
          initial='hidden'
          whileInView={'show'}
          className="lg:w-1/2"> 
            <div className="flex-1"> 
              {/* service list */}
              {services.map((service, index) => {
                  // destructure service
                  const {name, description, logo} = service;
                  return (
                    <div key={index} className="border-b border-white/20 py-6 lg:py-12 flex flex-col lg:flex-row-reverse lg:items-center gap-4">
                      <span className="btn lg:bg-transparent xl:bg-inherit w-9 h-9 flex justify-center items-center">
                        {logo}
                      </span>
                      <div className="max-w-[476px]">
                        <h4 className="text-[20px] tracking-wider font-primary font-semibold mb-6">{name}</h4>
                        <p className="font-secondary leading-tight">{description}</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
