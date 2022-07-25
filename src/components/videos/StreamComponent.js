import React, { createRef, useEffect, useState } from 'react'

function StreamComponentSub(props) {
  const [ videoRef, setVideoRef ] = useState(createRef());
  const [ streamManager, setStreamManager ] = useState( props.streamManager );
  
  useEffect(() => {
    if(props.streamManager){
    console.log("sub222222222222")
    setStreamManager(props.streamManager.addVideoElement(videoRef.current));
    }
  }, [ props.streamManager ]);

  if(!props.streamManager){
    console.log("sub")
    return <div>???</div>
  }else{
    console.log(props.speaker);
    console.log("왜 안뜨냐", props.streamManager.stream.connection?.connectionId);
    console.log("sub;;;;;;;;;;;;")
    return (
      <div>
        <div style={{ border: props.speaking && ( props.speaker === props.streamManager.stream.connection?.connectionId ) ? "5px solid black" : "5px solid purple" }}>subscribe</div>
        <div>{props.speaker}</div>
          <video width="187.5px" height="361px"
            autoPlay={true}
            ref={videoRef}
          />
          </div>
    )
    
  }
}

export default StreamComponentSub