import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <p className='footer__caption'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__container'>
                <p className='footer__copyright'>&copy; 2023</p>
                <nav className='footer__links'>
                    <a className='footer__link link_hovered' href="https://practicum.yandex.ru/" target='blank'>Яндекс.Практикум</a>
                    <a className='footer__link link_hovered' href="https://github.com/Kusaetsa" target='blank'>Github</a>
                </nav>
            </div>
        </footer>
    )

}

export default Footer;