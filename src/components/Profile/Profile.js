import React from 'react';
import './Profile.css';
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/Validation';

function Profile({ onUpdateUser, profileMessage, setCurrentUser, setIsLoggedIn, setFoundMovies, setApiMessage }) {

    const navigate = useNavigate();
    const [isSaveButtonVisible, setIsSaveButtonVisible] = React.useState(false); // стейт видимости сабмита
    const [isInputsActive, setIsInputsActive] = React.useState(false); // стейт активности инпутов
    const [isEditAndExitButtonsVisible, setIsEditAndExitButtonsVisible] = React.useState(true); //стейт видимости кнопок редактирования и выхода
    const [isSaveButtonActive, setIsSaveButtonActive] = React.useState(false); // стейт активности сабмита

    const { values, handleChange, errors, isValid } = useFormWithValidation();
    const currentUser = React.useContext(CurrentUserContext);

    // управляемые компоненты инпутов //
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    // классы валидности инпутов //
    const inputNameClassNames = (errors.name ? 'profile__input profile__input_invalid-name' : 'profile__input');
    const inputEmailClassNames = (errors.email ? 'profile__input profile__input_invalid-email' : 'profile__input');

    // классы оформления сообщения от апи //
    const messageClassNames = ((profileMessage === 'Данные успешно обновлены') ? 'profile__api-message_succsess' : 'profile__api-message_error');

    // классы оформления сабмита //
    const buttonSubmitClassNames = (` 
    ${!isSaveButtonActive ?  'profile__button_inactive' :  'profile__button_active button-hovered'}
    `);

    // управляет активностью инпутов //
    React.useEffect(() => {
        const inputsArray = Array.from(document.querySelectorAll('input'));
        if (isInputsActive) {
            inputsArray.forEach(element => {
                element.removeAttribute('disabled');
            });
        } else {
            inputsArray.forEach(element => {
                element.setAttribute('disabled', 'true');
            });
        }
    }, [isInputsActive])
    
    // управляет видимостью кнопок редактирования и выхода //
    React.useEffect(() => {
        if (!isEditAndExitButtonsVisible) {
            document.querySelector('.profile__links-container').style.display = 'none';
        } else {
            document.querySelector('.profile__links-container').style.display = 'flex';
        }
    }, [isEditAndExitButtonsVisible])

    // активирует инпуты и показывает саабмит //    
    function handleInputsActive() {
        setIsInputsActive(true);
        setIsEditAndExitButtonsVisible(false);
        setIsSaveButtonVisible(true);
    }

    // дизейбл сабмита //
    function handleSaveButtonActive() {
        const submitButton =  document.querySelector('.profile__button');
        if (isSaveButtonActive) {
            submitButton.setAttribute('disabled', 'true');
        } else {
            submitButton.removeAttribute('disabled');
        }
    }

    // подтягиваем данные при изменении контекста //
    React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);


    // получение данных из инпутов и их валидация//
    function handleNameChange(event) {
        const namePattern = /^[a-zA-Zа-яА-Я\s-]*$/;
        handleChange(event);
        if (event.target.value !== currentUser.name && namePattern.test(event.target.value)) {
            setIsSaveButtonVisible(true);
            setIsSaveButtonActive(true);
            handleSaveButtonActive();
            setName(event.target.value);
        } else {
            setIsSaveButtonVisible(true);
            setIsSaveButtonActive(false);
            handleSaveButtonActive();
        }
    }

    function handleEmailChange(event) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        handleChange(event);
        if (event.target.value !== currentUser.email && emailPattern.test(event.target.value)) {
            setIsSaveButtonVisible(true);
            setIsSaveButtonActive(true);
            handleSaveButtonActive();
            setEmail(event.target.value);
        } else {
            setIsSaveButtonVisible(true);
            setIsSaveButtonActive(false);
            handleSaveButtonActive();
        }
    }

    // обновление данных //
    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            onUpdateUser({
                name,
                email
            });
            setIsSaveButtonVisible(false);
            setIsSaveButtonActive(false);
            setIsEditAndExitButtonsVisible(true);
            setIsInputsActive(false);
            setTimeout(() => {
                document.querySelector('.profile__api-message').style.animation = 'hide-message 1s linear forwards';
            }, 2000);
            document.querySelector('.profile__api-message').style.animation = '';
            setApiMessage('');
        }
    }

    function signOut() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('savedSearchRequest');
        localStorage.removeItem('savedIsShortFilm');
        localStorage.removeItem('savedFoundMovies');
      //  localStorage.removeItem('movies');
        setFoundMovies([]);
        setIsLoggedIn(false);
        setCurrentUser({});
        setApiMessage('');
        navigate('/');
    }


    return (
        <section className='profile'>
            <div className='profile__container'>
                <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
                <form className='profile__form' method='post'>
                    <div className='profile__inputs-container'>
                        <label htmlFor='name-input' className='profile__input-label'>Имя</label>
                        <input
                            id='name-input'
                            type='text'
                            className={inputNameClassNames}
                            name='name'
                            value={values.name || name || ''}
                            required
                            onChange={handleNameChange}
                            disabled
                        />
                        <span className='profile__input-error'>{errors.name}</span>
                        <label htmlFor="email-input" className='profile__input-label'>E-mail</label>
                        <input
                            id='email-input'
                            type='email'
                            className={inputEmailClassNames}
                            name='email'
                            value={values.email || email || ''}
                            required
                            onChange={handleEmailChange}
                            disabled
                        />
                        <span className='profile__input-error'>{errors.email}</span>
                    </div>
                    <div className='profile__buttons-container'>
                        <span className={`profile__api-message ${messageClassNames}`}>{profileMessage}</span>
                        {
                            isSaveButtonVisible ?
                                (
                                    <button 
                                    type='submit' 
                                    onClick={handleSubmit} 
                                    className={`profile__button ${buttonSubmitClassNames}`}
                                    name='button-submit'
                                > Сохранить
                                </button>
                                )
                            : null
                        }
                        <div className='profile__links-container'>
                                <button 
                                    type='button' 
                                    className='profile__edit-button profile__edit-button_active button-hovered' 
                                    name='button-edit' 
                                    onClick={handleInputsActive}
                                > Редактировать
                                </button>
                            <Link to='/' className='profile__logout link-hovered' onClick={signOut}>Выйти из аккаунта</Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>

    )
}

export default Profile;