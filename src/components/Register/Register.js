import React from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';

function Register() {

    return (
        <section className='register'>
            <div className='register__container'>
                <img src={logo} className='register__logo' alt='логотип'></img>
                <h2 className='register__title'>Добро пожаловать!</h2>   
                <form className='register__form' method='post' noValidate>
                    <div className='register__inputs-container'>
                        <Input 
                            id = 'name-input'
                            type = 'text'
                            labelText = 'Имя'
                        />
                        <Input 
                            id = 'email-input'
                            type = 'email'
                            labelText = 'E-mail'
                        />
                        <Input 
                            id = 'password-input'
                            type = 'password'
                            labelText = 'Пароль'
                        />                                           
                    </div>     
                    <button type='submit' className='register__button button_hovered' name='button-submit'>Зарегистрироваться</button>
                </form>
                <div className='register__login-container'>
                    <p className='register__caption'>Уже зарегистрированы? </p>
                    <Link to='/signin' className='register__login link_hovered'>Войти</Link>
                </div>
            </div>
        </section>
    )
}

export default Register;
