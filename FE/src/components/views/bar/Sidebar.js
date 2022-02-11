import React, { useState } from 'react';
import { SidebarData, UndetbarData } from './SidebarData';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  nav: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
  }
}))

function Sidebar() {
  const [open, setOpen] = useState(true)
  const [search, setSearch] = useState(false)
  const [value, setValue] = React.useState('recents');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const userName = localStorage.getItem('userId')
  const userEmail = localStorage.getItem('userEmail')
  const navigate = useNavigate()
  const onNext = (path) => {
    console.log(path)
    navigate(`${path}`)
  }
  const classes = useStyles()
  return (
    <>
    <nav className='navbar'>
      <img src='/favicon/menu.png' onClick={() => setOpen(!open)}></img>
      <img src='/favicon/logo.png' className='logo'></img>
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
          <Avatar src="/broken-image.jpg"></Avatar>
          <div className='user-info'>
            <span>nickname</span>
            <span>email</span>
          </div>
          <div>
            흐에
          </div>
        </div>
        <hr/>
        <div className='banner'>
          <p>배너영역</p>
        </div>
        <ul className='nav-menu-items'>
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