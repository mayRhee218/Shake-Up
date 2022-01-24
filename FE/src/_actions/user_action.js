import axios from 'axios';
import{
    LOGIN_USER
} from './types';

export function loginUser(dataTosubmit) {
    // 서버에서 받은 data를 request에 저장
    const request =
        axios.post('https://www.mecallapi.com/api/login', dataTosubmit)
        .then(response => 
            response.data);
    return {
        type: "LOGIN_USER",
        payload: request
    }
}

export function auth() {
    // 서버에서 받은 data를 request에 저장
    const request =
        axios.get('http://114.129.238.28/users/auth')
        .then(response => 
            response.data);
    return {
        type: "AUTH_USER",
        payload: request
    }
}