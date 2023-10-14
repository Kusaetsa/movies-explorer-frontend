import React from 'react';
import './Title.css';

function Title({ titleText }) {
    return (
        <div className='title-container'>
            <h2 className='title'>{titleText}</h2>
        </div>
    )
}

export default Title;