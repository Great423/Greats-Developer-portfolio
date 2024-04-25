import React from 'react'
// icons
import { BsArrowUpRight } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight, FaSlash } from "react-icons/fa";
// framer motion
import { motion } from 'framer-motion';
// fade In
import { fadeIn } from '../variants';

const Contact = () => {
  return (
    <section id='contact' className="section">
      <div className="container mx-auto">
        <div className='flex flex-col lg:flex-row gap-6'>
          {/* text */}
          <motion.div
          variants={fadeIn('right', 0.1)}
          initial='hidden'
          whileInView={'show'}
           className='flex-1 space-y-4'>
            <h4 className='uppercase text-accent font-medium tracking-wide text-2xl md:text-[32px] flex items-center'><FaChevronLeft />{`Get in touch`}<FaSlash className="rotate-90" /><FaChevronRight /></h4>
            <h2 className='text-[45px] lg:text-[90px] leading-none'>
              Let's work <br /> together!
            </h2>
          </motion.div>
          {/* form */}
          <motion.form
          variants={fadeIn('left', 0.1)}
          initial='hidden'
          whileInView={'show'}
          
           className='flex-1 border rounded-2xl flex flex-col gap-y-6 pb-24 p-6 items-start'>
            <input type="text"
              placeholder='Your name'
              className='bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all' />
            <input type="text"
              placeholder='Your email'
              className='bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all' />
            <textarea type="text"
              placeholder='Your message'
              className='bg-transparent border-b py-12 outline-none w-full placeholder:text-white focus:border-accent transition-all resize-none mb-12' />
            <button className='btn btn-lg'>Send message</button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact