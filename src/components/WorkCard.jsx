import React from "react";
// components
import Button from './Button';

const WorkCard = ({project, icon: FaArrowRight}) => {
    const { title, preTitle, image } = project;
  return (
    <div className="group relative overflow-hidden border-2 border-white/50 rounded-xl">
        {/* overlay */}
        <div className="bg-black/70 lg:bg-transparent lg:group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300"></div>
        {/* img */}
        <img src={`/assets/${image}`} className="lg:group-hover:scale-125 transition-all duration-500 object-cover h-[324px] w-full" alt="" />
        {/* pretitle */}
        <div className="absolute bottom-24 lg:-bottom-full left-2 md:left-12 lg:group-hover:bottom-28 transition-all duration-500 z-50">
            <span className="text-gradient text-sm md:text-base">{preTitle}</span>
        </div>
        {/* title */}
        <div className="absolute bottom-14 lg:-bottom-full left-2 md:left-12 lg:group-hover:bottom-16 transition-all duration-700 z-50">
            <span className="md:text-3xl text-white">{title}</span>
        </div>
        <Button text={'View project'} icon={FaArrowRight} className="font-primary hover:bg-gradient-to-r to-[#FF56F6] via-[#b936ee] from-[#406aff] border border-white text-xs md:text-sm rounded-full px-2 py-1 md:px-4 md:py-2 absolute bottom-4 lg:-bottom-full left-2 md:left-12 lg:group-hover:bottom-4 transition-all duration-700 z-50 flex items-center gap-2"/>
    </div>
  );
};

export default WorkCard;
