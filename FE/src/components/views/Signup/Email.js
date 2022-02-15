/**
 *
 * @author 조준영
 * @version 1.0.0
 * 작성일 2022-01-24
**/
import React, { useEffect, useState, useRef } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios'
import Vaildate from './Vaildate';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  botton: {
    margin: '10px 0 0 0'
  },
}));
function Email({email, propFunction}) {
  // axios에서 받을 해쉬값
  const [hash, setHash]  = useState(Date.now())
  // 이메일 입력, 검증, 에러메시지
  const [inputEmail, setInputEmail] = useState(email) // 입력
  const [vaildPass, setValidPass] = useState(false) // 검증
  const [errorMsg, setErrorMsg] = useState('') // 에러메시지
  // 인증번호 입력, 검증
  const inputHash = useRef(Date.now())
  const [verify, setVerify] = useState(false)
  // 타이머
  const [restTime, setRestTime] = useState('')
  const [min, setMin] = useState(null)
  const [sec, setSec] = useState(null)

  // 인증메일 보내기
  const sendAuthEmail = async () => {
    // 중복검사 
    const emailDouble = await axios.get(`user/${email}`)
    if (!emailDouble) {
      const hash = await axios.get(`/user/emailcheck/${inputEmail}`)
      setHash(hash)
    }
  }

  const onEmailHandler = ({target: {value}}) => {
    setInputEmail(value)
    const returnVal = Vaildate('email', value)
    setValidPass(returnVal)
    if (returnVal) {
      setErrorMsg('')
    } else {
      setErrorMsg('이메일을 다시 확인해주세요')
    }
  }

  // 입력 해쉬값이랑 비교하기
  const isHash = () => {
    if (hash === inputHash) {
      setVerify(true)
      propFunction(inputEmail)
    } else {
      setVerify(false)
      propFunction('')
    }
  }
  

  // 타이머
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

  useEffect(() => {
    setValidPass(false)
    setVerify(false)
    propFunction('')
  }, [inputEmail])

  
  const classes = useStyles();

  return (
    <>
      <div>
        <TextField
          name='email'
          label="이메일"
          type='text'
          variant="standard"
          onChange={onEmailHandler}
          value={inputEmail}
          error={errorMsg !==''}
          helperText= {vaildPass ? '사용가능합니다': errorMsg}
        />
        <Button 
          onClick={sendAuthEmail} 
          variant='contained'
          color='primary'
          className={classes.botton}
        >
          {hash ? '인증번호 재발송':'인증번호 발송'}
        </Button>
      </div>
      <span>이메일 주소로 전송된 </span>
      <span>인증번호를 입력해주세요.</span>
      <div>
        <TextField
          label="인증번호"
          ref={inputHash}
          disabled={verify}
        />
        {!hash ? '':
          <p>{min}:{sec < 10 ? '0'+ sec : sec}</p>
        }
        <Button 
          variant='contained'
          color='primary' 
          onClick={isHash} 
          disabled={verify}
          className={classes.botton}
        >인증
        </Button>
      </div>
    </>
  );
}


export default Email;