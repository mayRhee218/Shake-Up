import React from 'react';
import { useLocation } from 'react-router-dom';

function VideoDetail(props) {
  const {video} = useLocation()
  return (
    <div>
      <video src={video.url}/>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default VideoDetail;