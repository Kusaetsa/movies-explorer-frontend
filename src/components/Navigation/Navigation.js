import './Navigation.css';
import React from 'react';
import { Link } from "react-router-dom";

function Navigation({isLoggedIn}) {

    const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

    function handleBurgerOpen() {
        setIsBurgerOpen(!isBurgerOpen);
    }

    const menuClassNames = ( 
        !isBurgerOpen ? 'navigation__burger button-hovered' : 'navigation__close-icon button-hovered'
    );

    const profileInfoClassNames = 
    window.location.pathname === '/' 
    ? 'navigation__profile-icon navigation__profile-icon_blue' 
    : 'navigation__profile-icon navigation__profile-icon_grey';

    return(
        <nav className='navigation'>
                {isLoggedIn 
                    ? (
                        <>
                        <button className={menuClassNames} onClick={handleBurgerOpen}></button>
                        <div className= {`navigation__container ${isBurgerOpen ? 'navigation__container_side-open' : ''}`}>
                            <div className='navigation__links-container'>
                                <Link to='/' className='navigation__link link-hovered navigation__link_main'>Главная</Link>                                 
                                <Link to='/movies' className='navigation__link link-hovered navigation__link_focus'>Фильмы</Link>
                                <Link to='/saved-movies' className='navigation__link link-hovered'>Сохраненные фильмы</Link>
                            </div>
                            <Link to='/profile' className='navigation__user-container link-hovered'>
                                <p className='navigation__link'>Аккаунт</p>
                                <div className={profileInfoClassNames}></div>
                            </Link>
                        </div>
                        </>
                    ) : (
                        <div className='navigation__buttons-container'>
                            <Link to='/signup' className='navigation__register-link link-hovered'>Регистрация</Link>
                            <Link to='/signin' className='navigation__login-button button-hovered'>Войти</Link>
                        </div>
                    )
                }            
        </nav>
    )
}

export default Navigation;
