import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Thumbnails from '../Thumbnails'
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
    const uid = localStorage.getItem('UserId')
    const credentials = {
      category : 0,
      uid:uid
    }
    axios.post(`/video/read/mycategory`, credentials)
    .then(res => {
      console.log(res)
      setVideos(res.data)
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
      <h1>최고점 획득 댄따</h1>
      
      <p>댄따 총 참여 회수</p>
      <p>{videos.length}회</p>
      <hr/>
      <h1>최근 참여 댄따</h1>
      {videos.map((video) => {
        <Thumbnails video={video}/>
      })}
    </div>
  );
}

export default Board1;