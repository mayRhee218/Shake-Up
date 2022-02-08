import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';


function Vote(props) {
  const [foods, setFoods] = useState([]);
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);

  const getItems= () => {
    const credentials = {
      category:1
    }
    axios.post(`/video/read/category/${1}`, credentials)
    .then(res => {
      res.data.sort(() => Math.random() - 0.5);
      setFoods(res.data);
      setDisplays([res.data[0], res.data[1]]);
    })
    .catch(err =>{
      console.log(err)
    })    
  }

  useEffect (() => {  
    getItems();
  }, []);

  const clickHandler = food => () => {
    if (foods.length <= 2) {
      if (winners.length === 0) {
        setDisplays([food]);
      } else {
        let updatedFood = [...winners, food];
        setFoods(updatedFood);
        setDisplays([updatedFood[0], updatedFood[1]]);
        setWinners([]);
      }
    } else if (foods.length > 2) {
      setWinners([...winners, food]);
      setDisplays([foods[2], foods[3]]);
      setFoods(foods.slice(2));
    }
  };

  return (
    <div>
      <h1 className="title">코믹댄스 최강자, 나야나!</h1>
        {displays.map(d => {
          return (
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
            </div>
           
          );
        })}
    </div>
  );
}

export default Vote;