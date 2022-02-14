import React, { useEffect, useState } from 'react';
import { SidebarData, UndetbarData } from './SidebarData';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'
import { Avatar } from '@material-ui/core';

function Sidebar() {
  const [open, setOpen] = useState(true)
  const [value, setValue] = useState('recents');
  const [auth, setAuth] = useState({
    userName : localStorage.getItem('UserName'),
    userId : localStorage.getItem('UserId'),
    userEmail : localStorage.getItem('UserEmail'),
    isLogin : localStorage.getItem('IsLogin')
  })
  const navigate = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onNext = (path) => {
    console.log(path)
    navigate(`${path}`)
  }
  const logout = () => {
    localStorage.clear()
    setAuth({})
  }
  const goHome = () => {
    navigate('/')
  }
  useEffect(()=> {
    const uid = localStorage.getItem('UserId')
    if (uid) {
      setAuth({
        userName : localStorage.getItem('UserName'),
        userId : localStorage.getItem('UserId'),
        userEmail : localStorage.getItem('UserEmail'),
        isLogin : localStorage.getItem('IsLogin')
      })
    }
  }, [])
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
          <Avatar src="/broken-image.jpg" ></Avatar>
          <div className='user-info'>
            <span>{auth.isLogin ? auth.userName : "로그인해주세요"}</span>
            <span>{auth.userEmail}</span>
          </div>
        </div>
        <hr/>
        <div className='banner'>
          <p>배너영역</p>
        </div>
        <ul className='nav-menu-items'>
          {auth.isLogin ? 
            <li className='nav-text' onClick={logout}>
                로그아웃
            </li> : 
            <>
            <Link to='/login' className='nav-link'>
              <li  className='nav-text' onClick={() => setOpen(!open)}>
                로그인
              </li>
            </Link>
            <Link to='/signup' className='nav-link'>
              <li className='nav-text' onClick={() => setOpen(!open)}>
                회원가입
              </li>
            </Link>
          </>
          }
          {SidebarData.map((item, index) => {
            return(
              <Link to={item.path} className='nav-link'>
                <li key={index} className='nav-text' onClick={() => setOpen(!open)}>
                  {item.title}
                </li>
              </Link>
            );
          })}
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