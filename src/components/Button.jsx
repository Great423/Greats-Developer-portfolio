import React from "react";
import { MdOutlineDangerous } from "react-icons/md";

const Button = ({type, text, className, websiteIcon, icon: IconComponent}) => {
  return (
    <button 
    type={type && 'submit'}
    className={text === "Currently Unavailable" ? 'cursor-not-allowed flex flex-row-reverse items-center gap-1 rounded-full px-5 py-2 bg-black/20 text-white/30' : className}
    disabled={text === "Currently Unavailable"}
    >
      {text}
      {text === "Currently Unavailable" && <MdOutlineDangerous className="text-red-700 text-lg" />}
      { IconComponent && <IconComponent className={text === "Currently Unavailable" || text === "Under Maintenance" ? "hidden" : websiteIcon && 'text-lg'} /> }
    </button>
  );
};

export default Button; 
 