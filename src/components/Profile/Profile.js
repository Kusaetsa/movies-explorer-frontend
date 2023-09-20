import React from 'react';
import './Profile.css';
import { Link } from "react-router-dom";

function Profile({ name, email }) {


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
                        />
                    </div>
                    <button type="submit" className="profile__button button_hovered" name="button-submit">Редактировать</button>   
                </form>

            </div>
            <Link to='/signin' className='profile__logout link_hovered'>Выйти из аккаунта</Link>
        </section>
    )
}

export default Profile;