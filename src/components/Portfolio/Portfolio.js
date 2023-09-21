import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio({portfolioItem, portfolioLink}) {

    
    return (
        <li className='portfolio__item'>
            <a href={portfolioLink} className='portfolio__link link_hovered' target="blank">
                <h4 className='portfolio__item-title'>{portfolioItem}</h4>
                <img src={arrow} alt='перейти по ссылке' className='portfolio__link-image'/>
            </a>
        </li>
    )

}

export default Portfolio;