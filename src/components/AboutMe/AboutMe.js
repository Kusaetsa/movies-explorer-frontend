import React from 'react';
import Title from '../Title/Title';
import Portfolio from '../Portfolio/Portfolio';
import myPhoto from '../../images/my-photo.png';
import './AboutMe.css';

function AboutMe() {
    return (
        <section className='about-me'>
            <Title
                titleText='Студент'
            />
            <div className='about-me__container'>
                <div className='about-me__info'>
                    <div className='about-me__text'>
                        <h3 className='about-me__title'>Юлия</h3>
                        <p className='about-me__prof'>Фронтенд-разработчик, 33 года</p>
                        <p className='about-me__bio'>Я родилась и живу в Санкт-Петербурге, закончила факультет ИЗО РГПУ им. А.И. Герцена. Замужем. Работала рекламщиком и дизайнером, в 2022 году уволилась с работы и сейчас занимаюсь фрилансом по направлению веб- и графического дизайна, а также веб-разработке.</p>
                    </div>
                    <a href='https://github.com/Kusaetsa' className='about-me__link link-hovered' target='blank'>Github</a>
                </div>
                <img src={myPhoto} className='about-me__photo' alt='фото'></img>
            </div>
            <div className='about-me__portfolio'>
                <h3 className='about-me__portfolio-title'>Портфолио</h3>
                <ul className='about-me__portfolio-container'>
                    <Portfolio
                        portfolioItem='Cтатичный сайт'
                        portfolioLink='https://kusaetsa.github.io/how-to-learn/'
                    />
                    <Portfolio
                        portfolioItem='Адаптивный сайт'
                        portfolioLink='https://kusaetsa.github.io/russian-travel/'
                    />
                    <Portfolio
                        portfolioItem='Одностраничное приложение'
                        portfolioLink='https://myplaces.nomoreparties.co/sign-in'
                    />
                </ul>
            </div>
        </section>
    )    
}

export default AboutMe;