/**
 *
 * @author 조준영
 * @version 1.0.0
 * 작성일 2022-01-24
**/
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {Button, TextField} from '@material-ui/core';
import OverLap from './OverLap'
import axios from 'axios';

function SignupNext() {
  const location = useLocation()
  console.log(location)
  const {id, email, password} = location.state
  
  const [unique, setUnique] = useState(false)
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(null)
  const randomPick = () => {
    axios.get('')
      .then(res => {
        setName(res)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const onSignUp = () => {
    const credentials = {
      id,
      email,
      password,
      name
    }
    axios.post({
      url:'/users/signin',
      data: credentials
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const propOverlap = (isUnique) => {
    if (isUnique) {
      setUnique(true)
    } else {
      setNameError('이미 존재하는 채널명입니다.')
    }
  }
  return (
    <div style={{
      display:'flex', flexDirection:'column',
      justifyContent:'center', alignItems:'center'
    }}>
      <h1>채널명</h1>
      <TextField 
        label='채널명'
        type='text'
        variant='standard'
        helperText={nameError}
      />
      <OverLap 
        url='name'
        value={name}
        propFunction={propOverlap}
      ></OverLap>
      <Button 
        onClick={randomPick}
        variant='contained'
        color='primary'
        >랜덤픽
      </Button>
      <Button 
        variant='contained'
        color='primary'
        onClick={onSignUp}
        disabled={!unique}
      >회원가입하기</Button>
    </div>
  );
}

export default SignupNext;