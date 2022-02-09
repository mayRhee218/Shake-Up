import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useHistory, useLocation } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


function Vote(props) {
  const [videos, setVideos] = useState([]);
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);
  const [best, setBest] = useState("");

  const navigate = useNavigate();

  const getItems= () => {
    const credentials = {
      category:1
    }
    axios.post(`/video/read/category/${1}`, credentials)
    .then(res => {
      console.log(res.data)
      res.data.sort(() => Math.random() - 0.5);
      setVideos(res.data);
      setDisplays([res.data[0], res.data[1]]);
    })
    .catch(err =>{
      console.log(err)
    })    
  }

  useEffect (() => {  
    getItems();
  }, []);

  const moveToResult = () => {
    navigate(`./result`, {state: {vid: best.vid}})
  }

  const clickHandler = video => () => {
    if (videos.length <= 2) {
      if (winners.length === 0) {
        setDisplays([video]);
        // 최종 winner
        console.log(video)
        setBest(video)
        // 지금까지 노출수, 클릭수, 좋아요수에 클릭수 더한 수
        // axios 비디오 정보 수정하기로 여기서 넘겨줌.
        
      } else {
        let updatedvideo = [...winners, video];
        setVideos(updatedvideo);
        setDisplays([updatedvideo[0], updatedvideo[1]]);
        // updatedvideo[0].likecnt += 1 
        // console.log()
        setWinners([]);
      }
    } else if (videos.length > 2) {
      setWinners([...winners, video]);
      setDisplays([videos[2], videos[3]]);
      setVideos(videos.slice(2));
    }
  };

  return (
    <div>
      <h1 className="title">코믹댄스 최강자, 나야나!</h1>
      {displays.length > 1 ? 
    ( <div>{displays.map(d => (
      <div className="flex-1" 
      key={d.vid} 
      onClick={clickHandler(d)}
      style={{ flexDirection:'column' }}
      >
        <video style={{width:'100vw', height:'30vh'}} src={d.url} controls/>
        <h3 className="name"
        style={{textAlign:'center'}}
        >{d.title}</h3>
      <br/>
      </div>))}</div>):
       // displays에 있는 애들이면 마지막 1개 남을떄 빼고 다 +1해주기.
       ( <div>{displays.map(d => (
        <div className="flex-1" 
        key={d.vid}
        onClick={clickHandler(d)}
        style={{ flexDirection:'column', marginTop:'100px' }}
        >
          <video style={{width:'100vw', height:'30vh'}} src={d.url} controls/>
          <h3 className="name"
          style={{textAlign:'center'}}
          >{d.title}</h3>
        <br/>
        <div style={{
          display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' 
        }}>
          <h2>당신이 선택한 댄스는 </h2>
          <h2>{d.title}입니다!</h2>
          <br/>
          <Button color="primary" variant="contained" onClick={moveToResult}>전체 결과 보기</Button>
        </div>
        </div>))}</div>)
    
    }
          

          
    </div>
  );
}

export default Vote;