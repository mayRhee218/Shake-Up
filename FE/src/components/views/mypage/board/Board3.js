import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Video from './Video';

function Board3() {
  const userId = localStorage.getItem('UserId')
  
  const [videos, setVideos] = useState([]);
  const getVideos = () => {
    axios.get(`/video/read/all/${userId}`)
    .then(res => {
      setVideos(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  }
  const go = (idx) => {
    videos.splice(idx, 1)
    setVideos(videos)
  }
  useEffect(() => {
    getVideos()
  }, [])
  return (
    <div>
      <h1>{videos}</h1>
      <h1>{videos.length}</h1>
      {videos.map((item, index) => {
        return (
            <Video key={index} data={item} propFunction={go} index={index}/>
          );
      })}
  </div>
  );
}

export default Board3;