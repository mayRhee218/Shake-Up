import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
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
  const [bestVid, setBestVid] = useState("")
  
  const getVideos = () => {
    // category, uid로 video 정보 가져오기
    const uid = localStorage.getItem('UserId')
    const credentials = {
      category : 0,
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

  const getBestScore = () => {
    // category, uid로 video 정보 가져오기
    const uid = localStorage.getItem('UserId')
    axios.get(`/video/${uid}`)
    .then(res => {
      console.log(res.data)
      setBestVid(res.data)

    })
    .catch(err =>{
      console.log(err)
    })    
  }

  useEffect(() => {
    getVideos();
    getBestScore();
  }, []);

  const classes = useStyles();

  return (
    <div>
      <h1>최고점 획득 댄따</h1>
      {/* <video src={bestVid.url}/> */}
      <div style={{
          display: 'flex',
          flexDirection:'row'
        }}>
          <img src={bestVid.url}/>
            <div style={{
          display: 'flex',
          flexDirection:'column'
            }}>
            <p>{bestVid.title}</p>
            </div>
      </div>
      
      <h2>댄따 총 참여 회수</h2>
      <p>{videos.length}회</p>
      <hr/>
      <h1>최근 참여 댄따</h1>
      {videos.map((video) => {
        return (
        <div style={{
          width:'30vw', 
          display: 'flex',
          flexDirection:'column',
        }}>
          {/* <video src={video.copy.url}/> */}
          {/* img는 썸네일이 이렇게 뜬다 보여주기용 */}
          <div style={{
          display: 'flex',
          flexDirection:'row'
        }}>
          <img src={video.original.thumbnail}/>
            <div style={{
          display: 'flex',
          flexDirection:'column'
            }}>
            <p>{video.name}</p>
            <p>{video.original.title}</p>
            <p>{video.copy.score}점</p>
            </div>
          </div>
          <br/>
        </div>
        )
      })}
    </div>
  );
}

export default Board1;