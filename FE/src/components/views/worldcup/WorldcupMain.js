import React from 'react';
import Button from '@material-ui/core/Button';
import { Link, useNavigate, useHistory } from "react-router-dom";

function WorldcupMain(props) {
  return (
    <div style={{
      display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' 
      , width: '100%', height: '88vh'
    }}>
      <p>2월 2주차 월드컵: 코믹댄스 최강자, 나야나</p>
      <img/>
      <p>참여영상 등록 가능 기간: 2022.02.06 ~ 2022.02.13</p>

      <br/>

      <Link to = './vote'>
      <Button color="primary" variant="contained">투표하러 가기</Button>
      </Link>
      <br/>
      <Link to = './participation'>
      <Button color="primary" variant="contained">월드컵 참여하기</Button>
      </Link>
      <br/>
      <Button color="primary" variant="contained">지난 월드컵 보러가기</Button>

    </div>
  );
}

export default WorldcupMain;