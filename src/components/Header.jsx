import React from "react";
// icons
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaSlash } from 'react-icons/fa';
// react router link
import { Link as RouteLink } from 'react-router-dom';
// react scroll link
import { Link as ContactLink } from 'react-scroll';

export default function Header() {
  return (
    <div className="header py-4 md:py-8">
      <div className="container mx-auto flex justify-between items-center">
        <RouteLink to="/">
          <button className="text-3xl md:text-4xl font-bold font-primary hover:cursor-pointer">{`Gre`}<span className="text-gradient">{`at.`}</span></button>
        </RouteLink>
        <ContactLink 
          to="contact"
          smooth={true}
          spy={true}>
          <button className="btn btn-sm">Work with me</button>
        </ContactLink>
      </div>
    </div>
  );
}
