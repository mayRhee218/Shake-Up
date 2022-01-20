import React from 'react';

function vaildate({email, password, confirmPassword}) {
  const errors = {};

  // 이메일 검증
  if (!/^[0-9a-z]*@[0-9a-z]*\.[a-z]{2,3}$/i.test(email)) {
    errors.email = '이메일 형식이 아닙니다.'
  } else if (email.indexOf('@') < 8) {
    errors.email = '이메일이 너무 짧습니다'
  }

  // 비밀번호 검증
  if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()-=])[A-Za-z\d!@#$%^&*()-=]{8,16}$/.test(password)) {
    errors.password = '패스워드를 다시 확인해주세요'
  } 
  if (password !== confirmPassword) {
    errors.confirmPassword = '비밀번호가 일치하지 않습니다'
  }
  return errors;
}

export default vaildate;