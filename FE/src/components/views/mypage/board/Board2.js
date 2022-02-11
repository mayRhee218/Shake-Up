import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
// import Thumbnails from '../Thumbnails'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function Board1(props) {
  const [videos, setVideos] = useState([]);
  
  const getVideos = () => {
    // category, uid로 video 정보 가져오기
    const userId = localStorage.getItem('UserId')
    axios.post(`/video/read/my/${userId}`)
    .then(res => {
      console.log(res)
      setVideos()
    })
    .catch(err =>{
      console.log(err)
    })    
  }  

  useEffect(() => {
    getVideos();
  }, []);

  const classes = useStyles();

  return (
    <div>
      <h1>월드컵 점수 표시</h1>
      
      <p>월드컵 총 참여 회수</p>
      <p>{videos.length}회</p>
      <hr/>
      <h1>최근 참여 월드컵</h1>
      {/* {videos.map((video) => {
        <Thumbnails video={video}/>
      })} */}
    </div>
  );
}

export default Board1;