import React from 'react';
import './DanddaMain.css';
import DanddaContent1 from './basic/DanddaContent';
import DanddaContent2 from './swp/DanddaContent';


function DanddaMain() {

    return (
        <div className='DanddaMain'>
            <h2># 기본기부터 배우는 힙합</h2>
            <div className='Carousel'>
                <DanddaContent1/>
            </div>
            <h2># 스우파 쌤들한테 배워볼래?</h2>
            <div className='Carousel'>
                <DanddaContent2/>
            </div>
        </div>
    );
}

export default DanddaMain;