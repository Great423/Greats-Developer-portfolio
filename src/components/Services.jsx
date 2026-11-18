// icons
import { FaCode, FaChevronLeft, FaChevronRight, FaSlash, FaPlug } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
// framer motion
import { motion } from 'framer-motion';
// fade In
import { fadeIn } from '../variants';
// react scroll link
import { Link } from 'react-scroll';
// components
import Button from './Button';

export default function Services() {
  // services data
  // Writing rule: no em dashes or en dashes in this content.
const services = [
  {
    name: 'Frontend Architecture & Application Development',
    description: `I build production React and Next.js applications: component architecture that survives a second feature set, routing and state structured for growth, and performance work against real constraints such as bundle size, render cost and mobile networks.`,
    logo: <FaCode />,
  },
  {
    name: 'API Integration & Data Layer',
    description: `I connect interfaces to the systems behind them: REST API integration, authentication and session handling, payment handoffs, and operational consoles built on live data. I work closely with backend engineers on how the frontend and the API fit together.`,
    logo: <FaPlug />,
  },
  {
    name: 'Technical Leadership & Mentorship',
    description: `I've led frontend at two companies, reviewing code, maintaining quality standards and mentoring junior developers. Through GDSC I mentored more than 50 students, and I document what I build so the next person can work in it.`,
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
              Frontend engineer with four years of professional experience building production web applications, and an Electrical &amp; Electronics Engineering background
            </motion.h3>
            <Link to="work">
              <motion.div
              variants={fadeIn('left', 0.3)}
              initial='hidden'
              whileInView={'show'}>
                <Button text={'See my work'} className='btn btn-sm'/>
              </motion.div>
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
