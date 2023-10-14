import React from 'react';
import './Profile.css';
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/Validation';

function Profile({ onUpdateUser, profileMessage, setCurrentUser, setIsLoggedIn, setFoundMovies }) {

    const navigate = useNavigate();
    const [isSaveButtonVisible, setIsSaveButtonVisible] = React.useState(false); // стейт видимости сабмита
    const [isEditButtonActive, setIsEditButtonActive] = React.useState(false); // стейт активности кнопки редактирования
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

    // классы кнопки сабмита //
    const buttonSubmitClassNames = (`${isSaveButtonVisible ? 'profile__button profile__button_active button-hovered' : 'profile__button'} 
    ${profileMessage === 'При обновлении профиля произошла ошибка' ? 'profile__button_inactive' : ''}`);

    // переключение видимости кнопки сабмита //
    function handleSaveButtonVisible() {
        setIsSaveButtonVisible(!isSaveButtonVisible);
        document.querySelector('.profile__links-container').style.display = 'none';
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
            setIsEditButtonActive(true);
            setName(event.target.value);
        } else {
            setIsEditButtonActive(false)
        }
    }

    function handleEmailChange(event) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        handleChange(event);
        if (event.target.value !== currentUser.email && emailPattern.test(event.target.value)) {
            setIsEditButtonActive(true);
            setEmail(event.target.value);
        } else {
            setIsEditButtonActive(false)
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
            setIsSaveButtonVisible(!isSaveButtonVisible);
            document.querySelector('.profile__links-container').style.display = 'flex';
            setIsEditButtonActive(false);
            setTimeout(() => {
                document.querySelector('.profile__api-message').style.animation = 'hide-message 1s linear forwards';
            }, 4000);
            document.querySelector('.profile__api-message').style.animation = '';
        }
    }

    function signOut() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('savedSearchRequest');
        localStorage.removeItem('savedIsShortFilm');
        localStorage.removeItem('savedFoundMovies');
        setFoundMovies([]);
        setIsLoggedIn(false);
        setCurrentUser({});
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
                        />
                        <span className='profile__input-error'>{errors.email}</span>
                    </div>
                    <div className='profile__buttons-container'>
                        <span className={`profile__api-message ${messageClassNames}`}>{profileMessage}</span>
                        <button type='submit' onClick={handleSubmit} className={buttonSubmitClassNames} name='button-submit'>Сохранить</button>
                        <div className='profile__links-container'>
                            {isEditButtonActive
                                ? (<button type='button' className='profile__edit-button profile__edit-button_active button-hovered' name='button-edit' onClick={handleSaveButtonVisible}>
                                    Редактировать
                                </button>)
                                : (<button type='button' className='profile__edit-button profile__edit-button_inactive' name='button-edit'>Редактировать</button>)
                            }
                            <Link to='/' className='profile__logout link-hovered' onClick={signOut}>Выйти из аккаунта</Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>

    )
}

export default Profile;