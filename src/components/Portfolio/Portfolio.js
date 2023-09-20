import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';
import { Link } from 'react-router-dom';

function Portfolio({portfolioItem, portfolioLink}) {
    return (
        <li className='portfolio__item'>
            <h4 className='portfolio__item-title'>{portfolioItem}</h4>
            <Link to={portfolioLink} className='portfolio__link link_hovered'>
                <img src={arrow} alt='перейти по ссылке' className='portfolio__link-image'/>
            </Link>
        </li>
    )

}

export default Portfolio;