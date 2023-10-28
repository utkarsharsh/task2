import React, { useState } from 'react';
import Webcam from 'react-webcam';

const Camera = (prop) => {
  const webcamRef = React.useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    prop.prop(false);
    // send it to a server.
  };

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}  style={{marginTop:'4px'}} >Capture</button>
    </>
  );
};

export default Camera;
