import React, { createRef, useEffect, useState } from 'react'
import { NoneVideoChat, NoneVideoChatImg, VideoChatUserIcon } from "../../styles/StyledVideo";

// icon

import Logo from "../../assets/icon-main-logo.svg";

function StreamComponentSub(props) {
  const [ videoRef, setVideoRef ] = useState(createRef());
  const [ streamManager, setStreamManager ] = useState( props.streamManager );
  
  useEffect(() => {
    if(props.streamManager){
    setStreamManager(props.streamManager.addVideoElement(videoRef.current));
    }
  }, [ props.streamManager ]);

  if(!props.streamManager){
    return (<NoneVideoChat>
      <NoneVideoChatImg src={Logo}/>
    </NoneVideoChat>)
  }else{
    return (
      <div style={{ position:"relative"}}>
        <VideoChatUserIcon />
        <video width="187.5px" height="330px" autoPlay={true} ref={videoRef} />
      </div>
    );
    
  }
}

export default StreamComponentSub