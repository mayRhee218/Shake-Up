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


function Board2({user}) {
  const [videos, setVideos] = useState([]);
  const uid = user.uid

  const getVideos = () => {
    // category, uid로 video 정보 가져오기
    // uid는 링크의 params 값을 main에서 props로 가져와야함.
    const credentials = {
      category : 1,
      uid : uid
    }
    axios.post(`/video/read/mycategory`, credentials)
    .then(res => {
      console.log(res.data)
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
      <h1>월드컵 점수 표시</h1>      
      <p>월드컵 총 참여 회수</p>
      <p>{videos.length}회</p>
      <hr/>
      <h1>최근 참여 월드컵</h1>
      {videos.map((video) => {
        return (
          <div>
          <p>{video.title}</p>
          <video style={{ width:'100px', height:'30vh' }}
          src={video.url}/>
          </div>
        )
      })}
    </div>
  );
}

export default Board2;