import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useHistory, useLocation } from "react-router-dom";
import trophy from './img/trophy.png'

function WorldcupResult(props) {
  const location = useLocation(); 
  const {vid} = location.state


  return (
    <div style={{
      display: 'flex', 
      flexDirection:'column',
      justifyContent: 'center', 
      alignItems: 'center' 
      , width: '100%', height: '88vh'
  }}>
      <img src={trophy} alt="trophy"
      style={{width:'100px', height:'100px'}}/>
      <br/>
      <h2>현재까지의 랭킹</h2>
      <hr/>



    </div>
  );
}

export default WorldcupResult;