import React from 'react';
// images 
import Great from '/assets/about2.png';
// social media icons 
import { FaTwitter, FaFacebook, FaGithub, FaWhatsapp  } from 'react-icons/fa';
// react scroll
import { Link } from 'react-scroll';
// type animation 
import { TypeAnimation } from 'react-type-animation';
// framer motion
import { motion } from 'framer-motion';
// fade In
import { fadeIn } from '../variants';
// curved text
import CurvedText from './CurvedText';
// custom hooks
import useMediaQuery from '../hooks/useMediaQuery';
// components
import Button from './Button';

const Banner = () => {
  const isMobile = useMediaQuery('(max-width: 959px)')
  return (
    <section id='home' className='h-[85vh] lg:h-fit flex items-center mt-11 md:mt-0'>
      <div className="container mx-auto space-y-4">
        <motion.div
          variants={fadeIn('up', 0.1)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once: true, amount: 0.7}} className="lg:hidden -mt-24 relative">
          <div className="animate-spin" style={{ animationDuration: '20s' }}>
            { isMobile && <CurvedText text='Onyenokwe Great Chukwuka. Frontend Dev. Designer._'/> }
          </div>
          <span className='absolute btn p-1 bg-[#C00ACA] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
            <img src={Great} className='rounded-full h-24 w-24' alt="" />
          </span>
        </motion.div>
        <div className='flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12'>
          {/* text */}
          <div className='flex-1 text-center font-secondary lg:text-left space-y-4'>
            <motion.span
              variants={fadeIn('up', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: true, amount: 0.7}}
              className='lg:text-xl font-secondary font-semibold uppercase leading-[1] flex items-center justify-center lg:justify-start'>
                Hello, world! <span className='animate-waveHand origin-[70%_70%]'>👋</span>, I'm
            </motion.span>
            <motion.h1
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: true, amount: 0.7}}
              className='text-3xl font-bold lg:text-5xl'>
                Onyenokwe Great Chukwuka
            </motion.h1>
            <motion.div
              variants={fadeIn('up', 0.3)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
             className='text-2xl lg:text-4xl font-secondary font-semibold uppercase leading-[1]'>
              <span className='text-white'>I am a </span>
              <TypeAnimation sequence={[
                'Developer', 2000,
                'Designer', 2000,
                'Techie', 2000
              ]}
              speed={50}
              className='text-accent'
              wrapper='span'
              repeat={Infinity}
              />
            </motion.div>
            <motion.p
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
             className='max-w-lg mx-auto lg:mx-0'>
              Got the skills to build anything from business sites to interactive web apps. Need a web presence or hiring? Let's talk!
            </motion.p>
            <motion.div
              variants={fadeIn('up', 0.5)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
             className='flex max-w-max gap-6 items-center mx-auto lg:mx-0'>
              <Link to="contact" activeClass="active" smooth={true} spy={true} capture>
                <Button text={'Contact me'} className='btn px-4 py-2' />
              </Link>
              <a href="#" className='text-gradient btn-link'>My resume</a>
            </motion.div>
            {/* socials */}
            <motion.div
            variants={fadeIn('up', 0.6)}
            initial='hidden'
            whileInView={'show'}
            // viewport={{once: false, amount: 0.7}}
             className='flex text-[20px] gap-6 max-w-max mx-auto lg:mx-0'>
              <a href="https://web.facebook.com/chukwuka.onyenokwe" className="hover:scale-150 transition-all">
                <FaFacebook />
              </a>
              <a href="https://github.com/Great423/" className="hover:scale-150 transition-all">
                <FaGithub />
              </a>
              <a href="https://wa.me/2349124160236" className="hover:scale-150 transition-all">
                <FaWhatsapp />
              </a>
              <a href="https://twitter.com/OnyenokweC" className="hover:scale-150 transition-all">
                <FaTwitter />
              </a>
            </motion.div>
          </div>
          {/* image */}
          <motion.div
          variants={fadeIn('left', 0.1)}
          initial='hidden'
          whileInView={'show'}
          className='hidden relative lg:flex items-center flex-1 rounded-full max-w-[320px lg:max-w-[482px]'>
            <img src={Great} className='absolute left-1/2 -translate-x-1/2 p-5 rounded-full z-10' alt="" />
            <div className="w-[484px] h-[484px] btn animate-spin rounded-full bg-[#C00ACA]" style={{animationDuration: '4s'}}></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 

export default Banner;
