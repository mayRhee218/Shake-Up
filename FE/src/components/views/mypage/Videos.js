import axios from 'axios';
import React from 'react';
import Video from './Video'

function Videos(props) {
  const arr = []
  const userId = localStorage.getItem('id')
  axios.get(`/video/${userId}`)
    .then(res => {
      arr.push([...arr, ...res])
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