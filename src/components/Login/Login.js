import React from 'react';
import './Login.css';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';

function Login() {


    return (
        <section className='login'>
            <div className='login__container'>
                <Link to='/' className='login__logo-link link-hovered'></Link>
                <h2 className='login__title'>Рады видеть!</h2>   
                <form className='login__form' method='post'>
                    <div className='login__inputs-container'>
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
                    <div className='login__buttons-container'>
                        <button type='submit' className='login__button button-hovered' name='button-submit'>Войти</button>
                        <div className='login__register-container'>
                            <p className='login__caption'>Ещё не зарегистрированы? </p>
                            <Link to='/signin' className='login__register link-hovered'>Регистрация</Link>
                        </div>   
                    </div>         
                </form>
            </div>
        </section>
    )
}

export default Login;
