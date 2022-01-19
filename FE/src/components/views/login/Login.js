import React, { useState } from 'react';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

function Login(props) {


    const [Email, setEmail] = useState("")
    const [EmailError, setEmailError] = useState("")
    const [Password, setPassword] = useState("")
    const [PasswordError, setPasswordError] = useState("")

    const onEmailHandler = (event) => {
        setEmailError("")
        setEmail(event.currentTarget.value)
        if (!isEmail(Email)) {
            setEmailError("이메일을 형식에 맞게 작성해주세요.")
        }
    }

    const onPasswordHandler = (event) => {
        setPasswordError("")
        setPassword(event.currentTarget.value)
        if (isPassword(Password) == 1) {
            setPasswordError("길이가 짧습니다")
        }
    }

    const isEmail = (Email) => {
        const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
        return emailRegex.test(Email);
    };

    const isPassword = (Password) => {

        if (Password.length < 7) {
            return 1;
          }
        return 0;
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Email === "") {
            setEmailError("이메일을 입력해야 합니다.")
        }
        if (Password === "") {
            setPasswordError("비밀번호를 입력해야 합니다.")
        }
        if (isEmail(Email)) {
            console.log('로그인 정보')
            console.log('Email', Email)
            console.log('Password', Password)
        }
    }

    
    const classes = useStyles();

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center' 
            , width: '100%', height: '88vh'
        }}>
            
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler} className={classes.root} autoComplete='off'
            >
                <h1>로그인</h1>
                <TextField id="standard-basic-email" label="Email" onChange={onEmailHandler} helperText={EmailError} autoCapitalize='off' />
                <TextField id="standard-basic-password" type='password' label="Password" onChange={onPasswordHandler} helperText={PasswordError} />
                <br />
                <Link to="/404" style={{ textDecoration: 'none', color:'inherit' }}>
                <Button style={{  width: '100%' }} variant="contained" color="primary" type="submit" disabled={Email === "" || Password === "" || !isEmail(Email)  ? true : false}>
                    로그인
                </Button>
                {/* <Button style={{  width: '100%' }} variant="contained" color="primary" type="submit" disabled={Email === "" || Password === ""   ? true : false}>
                    Login
                </Button> */}
                </Link>
                <Link to="/signup" style={{ textDecoration: 'none', color:'inherit' }}>
                <Button style={{  width: '100%' }} variant="contained" color="primary" type="button">
                    회원가입
                </Button>
                </Link>
            </form>
            {/* 소셜계정 로그인 */}
        </div>
    );
}

export default Login;