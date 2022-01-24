import React, { useState } from 'react';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { loginUser} from '../../../_actions/user_action';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

function Login(props) {

    
    const dispatch = useDispatch();
    const [Id, setId] = useState("")
    const [IdError, setIdError] = useState("")
    const [Password, setPassword] = useState("")
    const [PasswordError, setPasswordError] = useState("")

    

    

    const onIdHandler = (event) => {
        setIdError("")
        setId(event.currentTarget.value)
        // if (!isEmail(Email)) {
        //     setEmailError("이메일을 형식에 맞게 작성해주세요.")
        // }
    }

    const onPasswordHandler = (event) => {
        setPasswordError("")
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        
        //페이지 리프레쉬 방지
        event.preventDefault();

        if (Id === "") {
            setIdError("이메일을 입력해야 합니다.")
        }
        else if (Password === "") {
            setPasswordError("비밀번호를 입력해야 합니다.")
        }
        else {
            // console.log('로그인 정보')
            // console.log('Id', Id)
            // console.log('Password', Password)
            // 서버에 보내기
            let body = {
                id : Id,
                password : Password
            }

            Axios.post('http://114.129.238.28/user/login', body)
            .then(response => {
        
            })
            // dispatch(loginUser(body))
      		// // 로그인되면 /(index페이지)로 이동
            // .then(response => {
            //     if (response.payload.loginSuccess) {
            //         props.history.push('/')
            //     } else {
            //         alert('Error')
            //     }
            // })
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
                <TextField id="standard-basic-id" label="Id" onChange={onIdHandler} helperText={IdError} autoCapitalize='off' />
                <TextField id="standard-basic-password" type='password' label="Password" onChange={onPasswordHandler} helperText={PasswordError} />
                <br />
                {/* <Link to="/404" style={{ textDecoration: 'none', color:'inherit' }}> */}
                <Button style={{  width: '100%' }} variant="contained" color="primary" type="submit" disabled={Id === "" || Password === ""  ? true : false}>
                    로그인
                </Button>
                {/* </Link> */}
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