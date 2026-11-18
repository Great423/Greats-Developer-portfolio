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
              I&apos;m Onyenokwe Great Chukwuka, an Electrical &amp; Electronics Engineering graduate (B.Eng., Federal University Otuoke) working as a frontend developer since 2022.
              <br />
              I specialise in React, Next.js and TypeScript. I&apos;ve owned end-to-end frontend development across three production products in logistics, social media marketing and audio streaming. Most of that work sits where the frontend meets everything else: integrating REST APIs, structuring state for applications that outgrow their first version, building the consoles operators run a business on, and agreeing the data contract with backend engineers before either side builds against it.
              <br />
              I&apos;ve held Lead Frontend titles at Crudpen Technologies and FuelupGlobal, where I owned frontend architecture decisions, reviewed code and mentored junior developers. I&apos;m currently the sole developer of an internal HR management platform built in Next.js, TypeScript and Supabase, covering the application, the database schema and the authorisation model.
              <br />
              My engineering background isn&apos;t a detour from this work. I interned on gas distribution and electrical maintenance at Nigerian Gas Company (NNPC), and for my final-year project I designed and constructed a biometric fingerprint attendance system. When a product involves energy, logistics or field operations, I already understand the system the software is describing.
            </motion.p>
            {/* stats */}
            <motion.div
            variants={fadeIn('left', 0.4)}
            initial='hidden'
            whileInView={'show'}

             className='flex gap-6 lg:gap-10 mb-6'>
              <div>
                <div className='text-[25px] md:text-[40px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={4} duration={3} /> : null}
                  +
                </div>
                <div className="font-primary text-[11px] md:text-sm tracking-[2px]">
                  Years of <br />
                  Experience
                </div>
              </div>
              <div>
                <div className='text-[25px] md:text-[40px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={3} duration={3} /> : null}
                </div>
                <div className="font-primary text-[11px] md:text-sm tracking-[2px]">
                  Production <br />
                  Frontends
                </div>
              </div>
              <div>
                <div className='text-[25px] md:text-[40px] font-tertiary text-gradient mb-2'>
                  {inView ? <CountUp start={0} end={50} duration={3} /> : null}
                  +
                </div>
                <div className="font-primary text-[11px] md:text-sm tracking-[2px]">
                  Students <br />
                  Mentored
                </div>
              </div>
            </motion.div>
            <motion.div
            variants={fadeIn('left', 0.5)}
            initial='hidden'
            whileInView={'show'}
             className='flex gap-8 items-center'>
              <a href="/Great-Onyenokwe-CV.pdf" download>
                <Button text={'Download CV'} className='btn btn-lg'/>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
