import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio({portfolioItem, portfolioLink}) {

    
    return (
        <li className='portfolio'>
            <a href={portfolioLink} className='portfolio__link link-hovered' target='blank'>
                <h4 className='portfolio__title'>{portfolioItem}</h4>
                <img src={arrow} alt='перейти по ссылке' className='portfolio__link-image'/>
            </a>
        </li>
    )

}

export default Portfolio;