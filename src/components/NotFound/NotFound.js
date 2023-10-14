import React from 'react';
import './NotFound.css';


function NotFound() {


    return (
        <section className='not-found'>
            <div className='not-found__container'>
                <div className='not-found__text'>
                    <h2 className='not-found__title'>404</h2>
                    <p className='not-found__caption'>Страница не найдена</p>
                </div>
                <a href='/' className='not-found__link link-hovered'>Назад</a>
            </div>
        </section>
    )
}

export default NotFound;
