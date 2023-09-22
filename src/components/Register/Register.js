import React from 'react';
import './Register.css';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';

function Register() {

    return (
        <section className='register'>
            <div className='register__container'>
                <Link to='/' className='register__logo-link link-hovered'></Link>
                <h2 className='register__title'>Добро пожаловать!</h2>   
                <form className='register__form' method='post'>
                    <div className='register__inputs-container'>
                        <Input 
                            id = 'name-input'
                            type = 'text'
                            placeholder = 'введите имя'
                            labelText = 'Имя'
                        />
                        <Input 
                            id = 'email-input'
                            type = 'email'
                            placeholder = 'введите email'
                            labelText = 'E-mail'
                        />
                        <Input 
                            id = 'password-input'
                            type = 'password'
                            placeholder = 'введите пароль'
                            labelText = 'Пароль'
                        />                                           
                    </div>  
                    <div className='register__buttons-container'>
                        <button type='submit' className='register__button button-hovered' name='button-submit'>Зарегистрироваться</button>
                        <div className='register__login-container'>
                            <p className='register__caption'>Уже зарегистрированы? </p>
                            <Link to='/signin' className='register__login link-hovered'>Войти</Link>
                        </div>   
                    </div>               
                </form>

            </div>
        </section>
    )
}

export default Register;
