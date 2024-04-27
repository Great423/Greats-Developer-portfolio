import React from "react";

const Button = ({text, className, iconStyle, icon: IconComponent}) => {
  return (
    <button className={className}>
      {text}
      { IconComponent && <IconComponent className={iconStyle && 'text-lg'} /> }
    </button>
  );
};

export default Button; 
 