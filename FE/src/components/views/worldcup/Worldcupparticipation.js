import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Video from './Video';


function Worldcupparticipation(props) {
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
    <div style={{
      display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' 
      , width: '100%', height: '88vh'
    }}>
      <p>2월 2주차 월드컵: 코믹댄스 최강자, 나야나</p>  
      <div>
        <h1>{videos}</h1>
        <h1>{videos.length}</h1>
        {videos.map((item, index) => {
          return (
              <Video key={index} data={item} propFunction={go} index={index}/>
            );
        })}
      </div>
    </div>
  );
}

export default Worldcupparticipation;