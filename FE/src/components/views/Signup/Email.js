/**
 *
 * @author 조준영
 * @version 1.0.0
 * 작성일 2022-01-24
**/
import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios'

function Email({propFunction}) {
  const [inputHash, setInputHash] = useState('')
  const [isError, setIsError] = useState(false)
  const hash = ''
  const [verify, setVerify] = useState(false)
  const [restTime, setRestTime] = useState('')
  const [min, setMin] = useState(null)
  const [sec, setSec] = useState(null)
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onEmailHandler = ({target: {value}}) => {
    setEmail(value)
    if (value.length > 3 && !/^[0-9a-z]*@[0-9a-z]*\.[a-z]{2,3}$/i.test(value)) {
      setErrorMsg('이메일 형식이 아닙니다.')
    } else {
      setErrorMsg('')
    }
  }
    // 인증메일 보내기
  const emailHash = () => {
    setRestTime(600)
    axios.get({
      url: `/users/name/${email}`,
    })
      .then(res => {
        // 여기서 해쉬값 저장해야함
        // hash= 뭐시기
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const isHash = () => {
    if (hash === inputHash) {
      setVerify(true)
      setIsError(false)
      propFunction(true)
    } else {
      setVerify(false)
      setIsError(true)
      propFunction(false)
    }
  }
  useEffect(() => {
    const stopWatch = setInterval(() => {
      if (restTime < 0) {
        clearInterval(stopWatch)
      } else {
        setMin(Math.floor(restTime/60))
        setSec(restTime%60)
      }
      setRestTime(prev => prev-1)
    }, 1000);
    return () => clearInterval(stopWatch)
  }, [restTime])

  return (
    <>
      <TextField
        name='email'
        label="이메일"
        type='text'
        variant="standard"
        autoComplete='off'
        onChange={onEmailHandler}
        value={email}
        error={errorMsg ? true:false}
        helperText={errorMsg}
        />
      <Button 
        onClick={emailHash} 
        variant='contained'
        color='primary'>
        {hash ? '인증번호 재발송':'인증번호 발송'}</Button>
      <span>이메일 주소로 전송된 </span>
      <span>인증번호를 입력해주세요.</span>
      <TextField
        label="인증번호"
        value={inputHash}
        onChange={({target: {value}})=> {setInputHash(value)}}
        disabled={verify}
        error={isError}
        helperText={isError? '인증번호가 틀렸습니다':''}
      />
      {!hash ? '':
        <p>{min}:{sec < 10 ? '0'+sec : sec}</p>
      }
      <Button 
        variant='contained'
        color='primary' 
        onClick={isHash} 
        disabled={verify}
      >인증
      </Button>
    </>
  );
}


export default Email;