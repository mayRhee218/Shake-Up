import React, {useState, useEffect} from 'react';
import Video from './Video';
import axios from 'axios';

function Board5(props) {
  const [videos, setVideos] = useState([]);
  
  const getVideos = () => {
    // const userId = localStorage.getItem('UserId')
    const userId = 1
    axios.post(`/userlike/read/${userId}`)
    .then(res => {
      setVideos(res.data)
    })
    .catch(err =>{
      console.log(err)
    })    
  }  
  const Jo = (data) => {
    console.log(data)
  }
  useEffect(() => {
    getVideos();
  }, []);
  return (
    <div>
      {videos.map((item, index) => {
        return (
          <Video data={item} key={index} propFunction={Jo}/>
        );
      })}
    </div>
  );
}

export default Board5;