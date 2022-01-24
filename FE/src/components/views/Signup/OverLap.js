/**
 *
 * @author 조준영
 * @version 1.0.0
 * 작성일 2022-01-24
**/
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios'

function OverLap({url, value, propFunction}) {
  const [check, setCheck] = useState(false)
  const overLap = () => {
    axios.get(`/users/${url}/${value}`)
      .then(() => {
        propFunction(false)
      })
      .catch((err) => {
        console.log(err)
        propFunction(true)
      })
    setCheck(true)
    }
  return (
    <>
      <Button 
        color='primary' 
        variant="contained" 
        onClick={overLap} 
        disabled={check}
      >
        중복검사
      </Button>
    </>
  );
}

export default OverLap;