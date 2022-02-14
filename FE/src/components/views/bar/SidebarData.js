import React from 'react';

const uid = localStorage.getItem('UserId')
export const SidebarData = [
  {
    title:'회원정보 수정',
    path: '/user/sujeong',
    icon: '',
  },
  {
    title:'댄스 따라하기',
    path: '/',
    icon: '',
  },
  {
    title:'댄스 월드컵',
    path: '/worldcup',
    icon: '',
  },
  {
    title:'마이페이지',
    path: `/mypage/${uid}`,
    icon: '',
  },
]

export const UndetbarData = [
  {
    title: '댄따',
    path: '/',
    icon: '/favicon/music-note.png',
  },
  {
    title: '월드컵',
    path: '/worldcup',
    icon: '/favicon/trophy.png',
  },
]
