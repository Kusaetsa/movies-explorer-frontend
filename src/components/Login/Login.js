import React from 'react';
import './Login.css';
import Input from '../Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/Validation';
import * as Auth from '../../utils/Auth';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

function Login({ handleLogin, setCurrentUser, isPopupOpen, handlePopupOpenClick, closePopup, apiMessage, setApiMessage }) {

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(true); // стейт активности кнопки
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setIsButtonDisabled(true);
        if (isValid) {
            Auth.authorize({
                email: emailRef.current.value,
                password: passwordRef.current.value,
            })
                .then((data) => {
                    if (!data.token) {
                        setApiMessage('При авторизации произошла ошибка')
                        handlePopupOpenClick();
                        return;
                    }
                    handleLogin();
                    localStorage.setItem('jwt', data.token);
                    setCurrentUser(data);
                    setApiMessage('');
                    navigate('/movies');
                })
                .catch((err) => {
                    if (err === 'Ошибка: 401') {
                        setApiMessage('Вы ввели неправильный логин или пароль')
                    }
                    if (err === 'Ошибка: 500') {
                        setApiMessage('На сервере произошла ошибка')
                    }
                    handlePopupOpenClick();
                    console.log(`Ошибка авторизации: ${err}`);
                })
                .finally(() => {
                    resetForm();
                });

        }
    }

    React.useEffect(() => {
        const noErrorsMessages = Object.values(errors).every((error) => error === '');
        if (isValid && noErrorsMessages) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [isValid, errors])

    return (
        <section className='login'>
            <div className='login__container'>
                <Link to='/' className='login__logo-link link-hovered'></Link>
                <h2 className='login__title'>Рады видеть!</h2>
                <form className='login__form' method='post'>
                    <div className='login__inputs-container'>
                        <Input
                            id='email-input'
                            type='email'
                            placeholder='введите email'
                            labelText='E-mail'
                            name='email'
                            value={values.email || ''}
                            onChange={handleChange}
                            errorText={errors.email}
                            reference={emailRef}
                        />
                        <Input
                            id='password-input'
                            type='password'
                            placeholder='введите пароль'
                            labelText='Пароль'
                            name='password'
                            value={values.password || ''}
                            onChange={handleChange}
                            errorText={errors.password}
                            reference={passwordRef}
                        />
                    </div>
                    <div className='login__buttons-container'>
                        {isButtonDisabled
                            ? ( <button 
                                    type='submit' 
                                    className='login__button login__button_disabled' 
                                    name='button-submit' 
                                    disabled 
                                    onClick={handleSubmit}>Войти
                                </button>)
                            : ( <button 
                                    type='submit' 
                                    className='login__button register__button_enabled button-hovered' 
                                    name='button-submit' 
                                    onClick={handleSubmit}>Войти
                                </button>)
                        }
                        <div className='login__register-container'>
                            <p className='login__caption'>Ещё не зарегистрированы? </p>
                            <Link to='/signup' className='login__register link-hovered'>Регистрация</Link>
                        </div>
                    </div>
                </form>
            </div>
            {
                isPopupOpen ? <ErrorPopup
                    message={apiMessage}
                    isPopupOpen={isPopupOpen}
                    handlePopupOpenClick={handlePopupOpenClick}
                    closePopup={closePopup}
                /> : null
            }
        </section>
    )
}

export default Login;


