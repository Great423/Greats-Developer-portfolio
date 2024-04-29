import React from 'react';
// icons
import { FaChevronLeft, FaChevronRight, FaSlash } from "react-icons/fa";
// intersection observer
import {useInView} from 'react-intersection-observer';
// counter
import CountUp from 'react-countup';
// framer motion
import { motion } from 'framer-motion';
// fade In
import { fadeIn } from '../variants';
// components
import Button from './Button';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
  });
  return (
    <section id="about" className="section" ref={ref}>
      <div className="container mx-auto">
        <div className='flex flex-col gap-y-10 lg:flex-row lg:items-center lg:gap-x-20 lg:gap-y-0'>
          {/* img */}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          <motion.div
          variants={fadeIn('right', 0.1)}
          initial='hidden'
          whileInView={'show'}
           className='lg:flex-1 border-[20px] shadow-frame rounded-full md:h-[25rem] md:w-[25rem] lg:h-auto lg:w-auto bg-about bg-cover bg-no-repeat aspect-square mix-blend-lighten bg-bottom'></motion.div>
          {/* text */}
          <div className='flex-1'>
            <motion.h2
            variants={fadeIn('left', 0.1)}
            initial='hidden'
            whileInView={'show'}
             className='h2 text-accent text-2xl md:text-[32px] flex items-center'><FaChevronLeft />{`About me`} <FaSlash className="rotate-90" /><FaChevronRight /></motion.h2>
            <motion.h3
            variants={fadeIn('left', 0.2)}
            initial='hidden'
            whileInView={'show'}
            className='h3 mb-4 flex gap-2'>
              Hi there! <span className='animate-waveHand origin-[70%_70%]'>👋</span>
            </motion.h3>
            <motion.p
            variants={fadeIn('left', 0.3)}
            initial='hidden'
            whileInView={'show'}
             className='mb-6 space-y-3'>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
              My name is Onyenokwe Great Chukwuka, a passionate Front-end Web Developer with years of experience.
              Experienced with all stages of the development cycle from Planning and analysis, Design,
              Development, Testing, Deployment, Maintenance and Updates for dynamic web projects. 
              <br />
              My journey in the dynamic world of web development has been shaped by meaningful experiences. 
              A significant chapter of this journey unfolded within the GDSC <b>(Google Developers Students CLub)</b> community, where I had the privilege
              of donning the hat of an assistant Frontend Developer Lead.
              <br />
              Beyond coding, I bring a strong background in management and leadership, rounding out my capabilities 
              to not only deliver exceptional projects but to also collaborate effectively within a team. 
              <br />
              I'm also passionate about music and playing games and I'm always curious to learn more when it comes to new technologies and creative coding. 
              <br />
            </motion.p>
            {/* stats */}
            <motion.div
            variants={fadeIn('left', 0.4)}
            initial='hidden'
            whileInView={'show'}
            
             className='flex gap-6 lg:gap-10 mb-6'>
              <div>
                <div className='text-[25px] md:text-[40px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={35} duration={3} /> : null}
                  +
                </div>
                <div className="font-primary text-[11px] md:text-sm tracking-[2px]">
                  Projects <br />
                  Completed
                </div>
              </div>
              <div>
                <div className='text-[25px] md:text-[40px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={5} duration={3} /> : null}
                </div>
                <div className="font-primary text-[11px] md:text-sm tracking-[2px]">
                  Years of <br />
                  Experience
                </div>
              </div>
              <div>
                <div className='text-[25px] md:text-[40px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={20} duration={3} /> : null}
                  +
                </div>
                <div className="font-primary text-[11px] md:text-sm tracking-[2px]">
                  Satisfied <br />
                  Clients
                </div>
              </div>
            </motion.div>
            <motion.div
            variants={fadeIn('left', 0.5)}
            initial='hidden'
            whileInView={'show'}
             className='flex gap-8 items-center'>
              <Button text={'Resume'} className='btn btn-lg'/>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
