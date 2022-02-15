import React, { useContext, useEffect, useState } from 'react';
// import { SidebarData, UndetbarData } from './SidebarData';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'
import { Avatar } from '@material-ui/core';
import {UserContext} from '../../../App'

const SidebarData = [
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
]

const UndetbarData = [
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
const anonyData = [
  {
    title:'로그인',
    path: '/login',
    icon: '',
  },
  {
    title:'회원가입',
    path: '/signup ',
    icon: '',
  }
]

function Sidebar() {
  const [open, setOpen] = useState(true)
  const [value, setValue] = useState('recents');
  const {auth, setAuth} = useContext(UserContext)
  const [sideMenu, setSideMenu] = useState([])
  const navigate = useNavigate()
  
  const loginData = [
    {
      title:'회원정보 수정',
      path: '/user/sujeong',
      icon: '',
    },
    {
      title:'마이페이지',
      path: `/mypage/${auth.id}`,
      icon: '',
    },
  ]
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onNext = (path) => {
    console.log(path)
    navigate(`${path}`)
  }
  const logout = () => {
    localStorage.clear()
    setAuth({
      name: '',
      id: '',
      email: ''
    })
    setSideMenu([...anonyData, ...SidebarData])
  }
  const goHome = () => {
    navigate('/')
  }

  useEffect(()=> {
    console.log(auth)
    if (auth.id) {
      setSideMenu([...SidebarData, ...loginData])
    } else {
      setSideMenu([...anonyData, ...SidebarData])
    }
  }, [auth])
  return (
    <>
    <nav className='navbar'>
      <img src='/favicon/menu.png' onClick={() => setOpen(!open)}></img>
      <img src='/favicon/logo.png' className='logo' onClick={goHome}></img>
      <img src='/favicon/search.png'></img>
    </nav>
    <div className='block'></div>
    <div className={open ? 'sidebar active': 'sidebar'}>
      <div className='nav-menu'>
        <div className='alarm'>
          <img src='/favicon/left.png' onClick={() => setOpen(!open)}></img> 
          <div>
            <img src='/favicon/alarm.png'></img>
            <img src='/favicon/settings.png'></img>
          </div>
        </div>
        <hr/>
        <div className='user'>
          {/* <Avatar src="/broken-image.jpg" ></Avatar> */}
          <div className='user-info'>
            <span>{auth.name ? auth.name : "로그인해주세요"}</span>
            <span>{auth.email}</span>
          </div>
        </div>
        <hr/>
        <div className='banner'>
          <p>배너영역</p>
        </div>
        <ul className='nav-menu-items'>
          {sideMenu.map((item, index) => {
            return(
              <Link to={item.path} className='nav-link' key={index}>
                <li className='nav-text' onClick={() => setOpen(!open)}>
                  {item.title}
                </li>
              </Link>
            );
          })}
          {auth.id ? 
            <li className='nav-text' onClick={logout}>
                로그아웃
            </li> : 
            <>
            </>
          }
        </ul>
      </div>
    </div>
    <footer className='underbar'>
      {UndetbarData.map((item, index) => {
        return(
          <div className='underbar-menu-items' key={index} onClick={() => onNext(item.path)}>
              <img src={item.icon}></img>
              <span className='under-text'>
                  {item.title}
              </span>
          </div>
          );
        })}
    </footer>
    </>
  );
}

export default Sidebar;