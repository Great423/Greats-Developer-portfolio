import React from "react";
// react icons
import { BiHomeAlt, BiUser } from 'react-icons/bi';
import { BsClipboardData, BsBriefcase, BsChatSquareText } from 'react-icons/bs';
// react scroll
import { Link } from 'react-scroll';

export default function Nav() {
  return (
    <nav className="w-full max-w-[460px] z-[100] fixed left-1/2 -translate-x-1/2 bottom-2 lg:bottom-8">
      <div className="container mx-auto px-4">
        <ul className="w-full text-white/50 text-lg md:text-2xl bg-black/20 mx-auto px-3 py-3 md:px-5 md:py-4 max-w-[460px] backdrop-blur-2xl rounded-full flex justify-between items-center gap-4">
          <Link
            to="home"
            activeClass="active"
            smooth={true}
            spy={true} 
            offset={-200}
            className="cursor-pointer w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex items-center justify-center">
            <BiHomeAlt />    
          </Link>
          <Link
            to="about"
            activeClass="active"
            smooth={true}
            spy={true} 
            className="cursor-pointer w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex items-center justify-center">
            <BiUser />
          </Link>
          <Link
            to="services"
            activeClass="active"
            smooth={true}
            spy={true} 
            className="cursor-pointer w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex items-center justify-center">
            <BsClipboardData />
          </Link>
          <Link
            to="work"
            activeClass="active"
            smooth={true}
            spy={true} 
            className="cursor-pointer w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex items-center justify-center">
            <BsBriefcase />
          </Link>
          <Link
            to="contact"
            activeClass="active"
            smooth={true}
            spy={true} 
            className="cursor-pointer w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex items-center justify-center">
            <BsChatSquareText />
          </Link>
        </ul>
      </div>
    </nav>
  );
}
