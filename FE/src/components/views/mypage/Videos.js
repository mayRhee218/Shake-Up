import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Video from './Video'



function Videos(props) {
  const [arr, setArr] = useState([])
  console.log(arr)
  // const userId = localStorage.getItem('UserId')
  const userId = 1
  useEffect(() => {
    axios.post(`/video/read/my/${userId}`)
    .then(res => {
      arr.push(...res.data)
      setArr(arr)
    })
    .catch(err =>{
      console.log(err)
    })
  }, [])

  return (
    <>
    <h1>{arr.length}</h1>
    {arr.map((item, index) => {
      return (
        <div>
          <p>{item}</p>
          <Video data={item} key={index}/>
        </div>
        );
    })}
  </>
  );
}

export default Videos;