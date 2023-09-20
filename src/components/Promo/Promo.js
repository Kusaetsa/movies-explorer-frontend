import React from 'react';
import './Promo.css';
import banner__logo from '../../images/banner__landing-logo.svg';

function Promo() {
    return(
        <section className='promo__banner'>
            <h1 className='promo__header'>Учебный проект студента факультета Веб-разработки.</h1>
            <img src={banner__logo} className='promo__banner-logo' alt='логотип' />
        </section>
    )
}

export default Promo;