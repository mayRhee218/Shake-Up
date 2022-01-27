import React from 'react';
import './Sidebar.css'
import seong from './seong.png'

function SidebarLink({text, Icon}) {
  return (
    <div className='link'>
      <img src={seong} width='50px'></img>
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarLink;