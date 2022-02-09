import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useHistory, useLocation } from "react-router-dom";

function WorldcupResult(props) {
  const location = useLocation(); 
  const {vid} = location.state


  return (
    <div>
      <p>{vid}</p>
    </div>
  );
}

export default WorldcupResult;