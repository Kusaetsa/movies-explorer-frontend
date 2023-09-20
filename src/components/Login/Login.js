import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';

function Login() {


    return (
        <section className='login'>
            <div className='login__container'>
                <img src={logo} className='login__logo' alt='логотип'></img>
                <h2 className='login__title'>Рады видеть!</h2>   
                <form className='login__form' method='post' noValidate>
                    <div className='login__inputs-container'>
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
                    <button type='submit' className='login__button button_hovered' name='button-submit'>Войти</button>
                </form>
                <div className='login__register-container'>
                    <p className='login__caption'>Еще не зарегистрированы? </p>
                    <Link to='/signup' className='login__register </a>'>Регистрация</Link>
                </div>
            </div>
        </section>
    )
}

export default Login;
