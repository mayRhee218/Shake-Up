import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },

  },
}));


function Board1({user}) {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [bestVid, setBestVid] = useState("")
  
  const getVideos = () => {
    // category, uid로 video 정보 가져오기
    // uid는 링크의 params 값을 main에서 props로 가져와야함.
    const uid = user.uid

    const credentials = {
      category : 0,
      uid : uid
    }
    axios.post(`/video/read/mycategory`, credentials)
    .then(res => {
      console.log(uid, res.data)
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

  // const goOriginal = id =>() => {
  //   console.log(id, '클릭')
  //   navigate(`/mypage/${id}`)
  // }

  const classes = useStyles();

  return (
    <div>
      <h1>최고점 획득 댄따</h1>
      <div style={{
          display: 'flex',
          flexDirection:'row'
        }}>
          {/* <video src={bestVid.url}/> */}
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
            <div style={{
            display: 'flex',
            flexDirection:'row'
          }}>
          {/* img는 썸네일이 이렇게 뜬다 보여주기용 */}
          <img src={video.original.thumbnail} style={{width:'150px', height:'100px'}}/>
          <Link to={`/mypage/${video.original.uid}`}>
            <Avatar key={video.vid} src={video.profile}/>
          </Link>
            <div style={{
              display: 'flex',
              flexDirection:'column'
            }}>
            <p>{video.copy.vid}</p>
            <p>{video.origin_name}</p>님의 
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