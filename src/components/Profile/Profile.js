import React from 'react';
import './Profile.css';
import { Link } from "react-router-dom";

function Profile({ name, email }) {

    const [isSaveButtonVisible, setIsSaveButtonVisible] = React.useState(false);

    function handleSaveButtonVisible() {
        setIsSaveButtonVisible(!isSaveButtonVisible);
        document.querySelector('.profile__buttons-container').style.display = 'none';
    }

    const buttonClassNames = ( 
        isSaveButtonVisible ? 'profile__button profile__button_active button_hovered' : 'profile__button button_hovered'
    );

    return (
        <section className='profile'>
            <div className='profile__container'>
                <h2 className='profile__title'>Привет, Виталий!</h2>
                <form className='profile__form' method='post' noValidate>
                    <div className="profile__inputs-container">
                        <label for="name-input" className='profile__input-label'>Имя</label>
                        <input 
                            id="name-input" 
                            type="text" 
                            className="profile__input" 
                            name="name-input" 
                            value={name}
                            required 
                        />

                        <label for="email-input" className='profile__input-label'>E-mail</label>                        
                        <input 
                            id="email-input"  
                            type="email" 
                            className="profile__input" 
                            name="email-input" 
                            value={email}
                            required  
                        />
                    </div>
                    <span className='profile__error'>При обновлении профиля произошла ошибка</span>
                    <button type="submit" className={buttonClassNames} name="button-submit">Сохранить</button>  
                    <div className='profile__buttons-container'>
                        <button type="button" className="profile__edit-button profile__edit-button_inactive button_hovered" name="button-edit" onClick={handleSaveButtonVisible}>Редактировать</button>   
                        <Link to='/signin' className='profile__logout link_hovered'>Выйти из аккаунта</Link> 
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Profile;