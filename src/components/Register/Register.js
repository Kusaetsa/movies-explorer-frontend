import React from 'react';
import './Register.css';
import Input from '../Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/Validation';
import * as Auth from '../../utils/Auth';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

function Register({ handleLogin, setCurrentUser, isPopupOpen, handlePopupOpenClick, closePopup, apiMessage, setApiMessage }) {

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
    const nameRef = React.useRef();
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            Auth.register({
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            })
                .then((res) => {
                    if (!res) {
                        setApiMessage('При регистрации пользователя произошла ошибка.')
                        handlePopupOpenClick();
                        return;
                    }
                    handleLogin();
                    Auth.authorize({
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                    })
                        .then((data) => {
                            if (!data.token) {
                                setApiMessage('При авторизации произошла ошибка.')
                                handlePopupOpenClick();
                                return;
                            }
                            localStorage.setItem('jwt', data.token);
                            setCurrentUser(data);
                            navigate('/movies');
                })
            })
            .catch((err) => {
                if (err === 'Ошибка: 409') {
                    setApiMessage('Пользователь с таким email уже существует')
                }
                if (err === 'Ошибка: 500') {
                    setApiMessage('На сервере произошла ошибка')
                }
                handlePopupOpenClick();
                console.log(`Ошибка регистрации: ${err}`);
            })
            .finally(() => {
                resetForm();
            });
        }
    }

    React.useEffect(() => {
        if (isValid) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [isValid])

    return (
        <section className='register'>
            <div className='register__container'>
                <Link to='/' className='register__logo-link link-hovered'></Link>
                <h2 className='register__title'>Добро пожаловать!</h2>
                <form className='register__form' method='post' onSubmit={handleSubmit}>
                    <div className='register__inputs-container'>
                        <Input
                            id='name-input'
                            type='text'
                            placeholder='введите имя'
                            labelText='Имя'
                            name='name'
                            value={values.name || ''}
                            onChange={handleChange}
                            errorText={errors.name}
                            reference={nameRef}
                        />
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
                    <div className='register__buttons-container'>

                        {isButtonDisabled
                            ? (<button type='submit' className='register__button register__button_disabled' name='button-submit' disabled>Зарегистрироваться</button>)
                            : (<button type='submit' className='register__button register__button_enabled button-hovered' name='button-submit'>Зарегистрироваться</button>)
                        }
                        <div className='register__login-container'>
                            <p className='register__caption'>Уже зарегистрированы? </p>
                            <Link to='/signin' className='register__login link-hovered'>Войти</Link>
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

export default Register;
