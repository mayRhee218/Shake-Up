 import React, { useState } from 'react';
 import {TextField, Box, Button, Grid} from '@material-ui/core';
 import vaildate from './vaildate';
//  import axios from 'axios';

function Signup() {
  const [credential, setCredential] = useState({
    id: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errorMsg, setErrorMsg] = useState({
    id: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [check, setCheck] = useState({
    id: null,
    email: false,
    emailHash: '',
  })
  const [disabled, setDisabled] = useState(false)

  const handleChange = ({target}) => {
    const {name, value} = target
    setCredential({...credential, [name]: value});
  }
  const onSubmit = async (e) => {
    setDisabled(true)
    e.preventDefault()
    await new Promise((r) => setTimeout(r, 100));
    setErrorMsg(vaildate(credential))
    setDisabled(false)
  }
  const isHash = ({target}) => {
    if (emailHash === target.value) {
      console.log('패스')
    } else {
      console.log('안패스')
    }
  }
  const emailHash = () => {
    console.log(credential.email)
    setCheck({...check, email:true})
    // setCheck({...check, [email]: true})
    // axios({

    // })
  }
  const overLap = () => {
    setCheck({...check, id: true})
    // axios({
    //   method: 'GET',
    //   url: `http://localhost:3000/users/idcheck/${credential.id}`,
    //   header:{
    //     'Accept':'application/json',
    //     'Content-Type':'application/json;charset=UTP-8'
    //   },
    // })
    //   .then(res => {
    //     console.log(res)
    //   })
  }
  return (
    <Box sx={{p:2, border: '1px solid grey', margin:'auto', width:350}}>
      <form onSubmit={onSubmit}>
        <Grid container direction='column' justifyContent='center' alignItems='flex-start'>
          <Grid>
            <TextField
              name='id' 
              label="아이디"
              type='text'
              variant="standard"
              onChange={handleChange}
              value={credential.id}
              helperText={errorMsg.id ? '': errorMsg.id}
            />
            <Button onClick={overLap} style={{marginTop:'10px'}}>중복검사</Button>
          </Grid>
          <Grid>
            <TextField
              name='email'
              label="이메일"
              type='text'
              variant="standard"
              autoComplete='off'
              onChange={handleChange}
              value={credential.email}
              error={errorMsg.email ? true:false}
              helperText={errorMsg.email}
             />
            <Button onClick={emailHash} style={{marginTop: '10px'}}>{check.email ? '인증번호 재발송' : '인증번호 발송'}</Button>
            {/* axios로 보내면 응답이 이메일의 해쉬값이 오고, 저장해놨다가 같은값인지 확인*/}
            {!check.email ? '' : 
              <div style={{p:3, border: '1px solid red'}}>
                <p>이메일 주소로 전송된 인증번호를 입력해주세요.</p>
                <TextField
                  label="인증번호"
                  margin="none"
                  />
                <Button onSubmit={isHash} style={{marginTop:'10px'}}>인증</Button>
              </div>
            }
          </Grid>
          <Grid>
            <TextField
              name='password'
              label="비밀번호"
              type='password'
              variant="standard"
              autoComplete="new-password"
              onChange={handleChange}
              value={credential.password}
              error={errorMsg.password ? true:false}
              helperText={errorMsg.password}
            />
          </Grid>
          <Grid >
          <TextField
            name="confirmPassword"
            label="비밀번호 확인"
            type='password'
            autoComplete="new-password"
            variant="standard"
            onChange={handleChange}
            value={credential.confirmPassword}
            error={errorMsg.confirmPassword ? true:false}
            helperText={errorMsg.confirmPassword}
          />
          </Grid>
          <Button type="submit" variant='contained'style={{margin: 'auto', width:'50%'}} color='primary' disabled={disabled}>가입하기</Button>
        </Grid>
      </form>
    </Box>
  );
 }
 
 export default Signup;