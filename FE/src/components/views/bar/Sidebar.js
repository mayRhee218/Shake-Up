import React, { useState } from 'react';
import { SidebarData, UndetbarData } from './SidebarData';
import { Link } from 'react-router-dom';
import './Sidebar.css'
import seong from './seong.png'


function Sidebar() {
  const [open, setOpen] = useState(true)
  const [search, setSearch] = useState(false)
  return (
    <>
    <nav className='navbar'>

      <img src='/favicon/menu.png' onClick={() => setOpen(!open)}></img>
      <img src='/favicon/logo.png' className='logo'></img>
      {/* <div className={search ? 'searchbar active' : 'searchbar'}></div> */}
      <img src='/favicon/search.png'></img>
    </nav>
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
          <img src={seong} onClick={() => setOpen(!open)}></img>
          <div className='user-info'>
            <span>nickname</span>
            <span>email</span>
          </div>
          <div>
            <Link to='/signup'>
              <img src='/favicon/right.png'></img>
            </Link>
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
                <li key={index} className='nav-text'>
                  {item.title}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
    <footer className='underbar'>
      <div className='underbar-menu-items'>
        {UndetbarData.map((item, index) => {
          return(
            <Link to={item.path} className='under-link' key={index}>
              <img src={item.icon}></img>
              <span className='under-text'>
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
    </>
  );
}

export default Sidebar;