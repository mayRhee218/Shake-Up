import React, {useState, useEffect} from 'react';
import Video from './Video';
import axios from 'axios';

// 구독
function Board4(props) {
  const [videos, setVideos] = useState([]);
  
  const getVideos = () => {
    const userId = localStorage.getItem('UserId')
    axios.post(`/userlike/read/${userId}`)
    .then(res => {
      setVideos(res.data)
    })
    .catch(err =>{
      console.log(err)
    })    
  }  

  useEffect(() => {
    getVideos();
  }, []);
  return (
    <div>
      {videos.map((item, index) => {
        return (
          <Video data={item} key={index} />
        );
      })}
    </div>
  );
}

export default Board4;