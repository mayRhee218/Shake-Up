/**
 *
 * @author 조준영
 * @version 1.0.0
 * 작성일 2022-01-21
**/
import React, { useState } from 'react';
import {TextField, Button} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import OverLap from './OverLap'
import Email from './Email'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

function Signup() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [check, setCheck] = useState({
    id: false,
    email: false,
    pw: false
  })
  const [idErrorMsg, setIdErrorMsg] = useState('')
  const [pwErrorMsg, setPwErrorMsg] = useState('')
  const [cpwErrorMsg, setCpwErrorMsg] = useState('')
  
  const navigate = useNavigate()

  const onIdHandler = ({target: {value}}) => {
    setId(value)
    if (value.length > 3 && !/^[a-z0-9]{6,12}$/i.test(value)){      
      setIdErrorMsg('아이디 문제있네')
    } else {
      setIdErrorMsg('')
    }
  }

  // 패스워드
  const onPwdHandler = ({target: {value}}) => {
    setPassword(value)
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()-=])[A-Za-z\d!@#$%^&*()-=]{8,16}$/.test(value)) {
      setPwErrorMsg('패스워드를 다시 확인해주세요')
    } else {
      setPwErrorMsg('')
    }
  }
  // 패스워드 재확인
  const onConPwdHandler = ({target: {value}}) => {
    setConfirmPassword(value)
    if (password !== value) {
      setCpwErrorMsg('비밀번호가 일치하지 않습니다')
    } else {
      setCheck({...check, pw:true})
      setCpwErrorMsg('')
    }
  }
  //이메일 인증
  const isRight = (isSame) => {
    if (isSame) {
      setCheck({...check, email:true})
    } else {
      
    }
  }
  // 아이디 중복검사
  const propOverlap = (isUnique) => {
    console.log(isUnique)
    if (isUnique) {
      setCheck({...check, id:true})
    }
  }
  // 다음 버튼
  const onNext = () => {
    navigate('/signup/next', {
      state: {
        id,
        password
      },
    });
  }
  const classes = useStyles();

  // --------------------------------------------------------------------

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start' 
      , width: '100%', height: '88vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
        className={classes.root} autoComplete='off'>
          <TextField
            name='id' 
            label="아이디"
            type='text'
            variant="standard"
            onChange={onIdHandler}
            value={id}
            error={idErrorMsg ? true:false}
            helperText={idErrorMsg}
          />
          
          <OverLap 
            url='idcheck'
            value={id}
            propFunction={propOverlap}
          ></OverLap>
          {/* axios로 보내면 응답이 이메일의 해쉬값이 오고, 저장해놨다가 같은값인지 확인*/}
          <Email 
            propFunction={isRight}
          ></Email>
          <TextField
            name='password'
            label="비밀번호"
            type='password'
            variant="standard"
            autoComplete="new-password"
            onChange={onPwdHandler}
            value={password}
            error={pwErrorMsg ? true:false}
            helperText={pwErrorMsg}
            />
        <TextField
          name="confirmPassword"
          label="비밀번호 확인"
          type='password'
          autoComplete="new-password"
          variant="standard"
          onChange={onConPwdHandler}
          value={confirmPassword}
          error={cpwErrorMsg ? true:false}
          helperText={cpwErrorMsg}
          />
        <Button
          type="button" 
          variant="contained"
          color="primary"
          disabled={!(check.id && check.email && check.pw)}
          onClick={onNext}
          >다음단계
        </Button>
      </form>
    </div>

  );
 }
 
 export default Signup;