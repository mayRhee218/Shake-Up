import React, { useState } from 'react';
import Overlap from '../Signup/OverLap';
import Email from '../Signup/Email';
import { Button, TextField } from '@material-ui/core';

function PutCredentials(props) {
  const [name, setName] = useState('name')
  const [email, setEmail] = useState('email')
  const [password, setPassword] = useState('password')
  
  const onPut = () => {

  }
  const propNameFunc = () => {

  }
  const propEmailFunc = () => {

  }
  return (
    <div>
      <form onSubmit={onPut}>
        <Overlap
          type='name'
          value={name}
          propFunction={propNameFunc}
        >
        </Overlap>
        <Email
          email={email}
          propFunction={propEmailFunc}
        >
        </Email>
        <TextField
          label='비밀번호'
          type='password'
          variant='standard'
        />
        <TextField
          label='비밀번호 확인'
          type='password'
          variant='standard'
        />
        <Button
          type='submit'
        >
          수정하기
        </Button>
      </form>
    </div>
  );
}


export default PutCredentials;
