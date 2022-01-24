// import React, { useState, useEffect } from 'react';
import React from 'react';
// import axios from 'axios';

function Dandda(props) {

    // 요청받은 정보를 담아줄 변수 선언
    // const [testStr, setTestStr] = useState('');
    // 변수 초기화
    // function callback(str) {
    //     setTestStr(str);
    // }

    // useEffect(
    //     () => {
    //       axios({
    //           url: '/',
    //           method: 'GET'
    //       }).then((res) => {
    //           callback(res.data);
    //       })
    //     }, []
    // );

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center' 
            , width: '100%', height: '88vh'
        }}>
            {/* <h1>{testStr}</h1> */}
            <h1>메인페이지</h1>
        </div>
    );
}

export default Dandda;