import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaChevronLeft, FaChevronRight, FaSlash } from "react-icons/fa";
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import Button from './Button';
import Toast from './Toast';

const Contact = () => {
  const form = useRef();
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [statusEmoji, setStatusEmoji] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();

    emailjs.sendForm('service_0u3blq8', 'template_o39t5hp', form.current, {
        publicKey: '9BVJWOTFoUTVqQNr-',
      })
      .then(() => {
          setToastMessage('Message sent successfully!');
          setStatusEmoji('👍');
          setIsToastVisible(true);
          setTimeout(() => {
            setIsToastVisible(false);
          }, 3000); 
          console.log('SUCCESS!');
        }, 
        (error) => {
          setToastMessage('Failed to send message. Please try again.');
          setStatusEmoji('👎');
          setIsToastVisible(true);
          setTimeout(() => {
            setIsToastVisible(false);
          }, 3000); 
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <section id='contact' className="section">
      <div className="container mx-auto">
        <div className='flex flex-col lg:flex-row gap-6'>
          <motion.div
            variants={fadeIn('right', 0.1)}
            initial='hidden'
            whileInView={'show'}
            className='flex-1 space-y-4'
          >
            <h4 className='uppercase text-accent font-medium tracking-wide text-2xl md:text-[32px] flex items-center'>
              <FaChevronLeft />{`Get in touch`}<FaSlash className="rotate-90" /><FaChevronRight />
            </h4>
            <h2 className='text-[45px] lg:text-[90px] leading-none'>
              Let's work <br /> together!
            </h2>
          </motion.div>
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            variants={fadeIn('left', 0.1)}
            initial='hidden'
            whileInView={'show'}
            className='flex-1 border rounded-2xl flex flex-col gap-y-6 p-6 items-start'
          >
            <input
              type="text"
              name="name"
              placeholder='Your name'
              className='bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all'
              required
              autoComplete='off'
            />
            <input
              type="email"
              name="email"
              placeholder='Your email'
              className='bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all'
              required
            />
            <textarea
              name="message"
              placeholder='Your message'
              className='bg-transparent border-b py-12 outline-none w-full placeholder:text-white focus:border-accent transition-all resize-none mb-12'
              required
            />
            <Button type='submit' text={'Send message'} className='btn btn-lg' />
          </motion.form>
        </div>
      </div>
      {isToastVisible && (
        <Toast animation='animate-slideIn' statusEmoji={statusEmoji} toastMessage={toastMessage} />
      )}
    </section>
  )
}

export default Contact;
