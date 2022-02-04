import axios from 'axios';
import React from 'react';
import Video from './Video'

function Videos(props) {
  const arr = []
  const userId = localStorage.getItem('UserId')
  axios.post(`/video/read/my/${userId}`)
    .then(res => {
      arr.push([...res])
    })
    .catch(err =>{
      console.log(err)
  })
  return (
    <>
      {arr.map((item, index) => {
        return (
          <>
            <Video data={item}/>
          </>
        );
      })}
    </>
  );
}

export default Videos;