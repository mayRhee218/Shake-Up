import React from 'react';
import './download.css'

function download() {
  const onclick = () => {
    alert('엥이')
  }
  return (
    <div className='body'>
      <div className='bar'></div>
      <span className="down">click 👇</span>
      <div className="wrapper">
        <h1 className='h1' data-heading="Shake Up" onClick={onclick}>Shake Up</h1>
      </div>
    </div>
  );
}

export default download;