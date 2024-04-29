import React from "react";

const Toast = ({toastMessage, animation, statusEmoji}) => {
  return (
        <div className={`btn rounded-lg bg-[#C00ACA] ${animation} fixed top-4 right-4 p-3 max-w-[250px] md:max-w-md`}>
            <div className={`bg-white text-black text-sm lg:text-base p-4 rounded-lg shadow-md flex items-center gap-2`}>
                <div>{statusEmoji}</div>  
                {toastMessage}
            </div>
        </div>
    );
};

export default Toast;

