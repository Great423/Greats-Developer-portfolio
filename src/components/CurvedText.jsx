import React, { useEffect, useRef } from 'react';
import CircleType from 'circletype';

const CurvedText = () => {
  const circleRef = useRef();

  useEffect(() => {
    // Create a new Circletype instance with the reference to your element
    const circleType = new CircleType(circleRef.current);

    circleType.radius();
    
    // Clean up when the component unmounts
    return () => {
      circleType.destroy();
    }; 
  }, []);

  return (
    <h2 ref={circleRef} id="demo3" className='text-sm'>Onyenokwe Great Chukwuka. Frontend Dev. Designer._</h2>
  );
};

export default CurvedText;
