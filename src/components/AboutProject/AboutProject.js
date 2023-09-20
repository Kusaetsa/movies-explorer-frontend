import React from 'react';
import Title from '../Title/Title';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className='about-project'>
            <Title
                titleText='О проекте'
            />
            <div className='about-project__table'>
                <div className='about-project__column'>
                    <h3 className='about-project__title'>Дипломный проект включал 5 этапов</h3>
                    <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='about-project__column'>
                    <h3 className='about-project__title'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='about-project__progress-line'>
                <div className='progress-line__green-line progress-line__item'>1 неделя</div>
                <div className='progress-line__grey-line progress-line__item'>4 недели</div>
                <div className='progress-line__caption progress-line__item'>Back-end</div>
                <div className='progress-line__caption progress-line__item'>Front-end</div>
            </div>
        </section>
    )
}

export default AboutProject;