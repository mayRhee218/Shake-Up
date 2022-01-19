import React from 'react';
import { Link } from 'react-router-dom'
import styles from './JoinEnd.module.css'


function JoinEnd(props) {

  return (
    <div>
      <div className={styles.all}>
        <h1>축하합니다. 아이디님!</h1>
        <h1>회원가입이 완료되었습니다.</h1>
        <br/>
        <h3>댄스를 배우고 싶으신가요?</h3>
        <h3>유명 댄서의 춤을 따라하고 정확한지 검사받아 보세요!</h3>
        <button className={styles.btn}>
          <Link to = {`/댄따주소`}>이용하러 가기</Link>
        </button>
        <hr/>
        <h3>불꽃튀는 댄스배틀을 보고</h3>
        <h3>더 잘 춘 춤에 투표해주세요!</h3>
        <button className={styles.btn}>
          <Link to = {`/월드컵주소`}>이용하러 가기</Link>
        </button>
      </div>      
    </div>
  );
}

export default JoinEnd;