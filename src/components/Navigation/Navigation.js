import './Navigation.css';
import React from 'react';
import { Link, NavLink } from "react-router-dom";

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
                                <NavLink to='/' className={({isActive}) => `${isActive ? 'navigation__link_active navigation__link_focus navigation__link_main' : 'navigation__link link-hovered navigation__link_main'}`}>Главная</NavLink>                                 
                                <NavLink to='/movies' className={({isActive}) => `${isActive ? 'navigation__link_active navigation__link_focus' : 'navigation__link link-hovered'}`}>Фильмы</NavLink>
                                <NavLink to='/saved-movies' className={({isActive}) => `${isActive ? 'navigation__link_active navigation__link_focus' : 'navigation__link link-hovered'}`}>Сохраненные фильмы</NavLink>
                            </div>
                            <NavLink to='/profile' className={({isActive}) => `${isActive ? 'navigation__link_active navigation__user-container navigation__link_focus' : 'navigation__user-container link-hovered'}`}>
                                <p className='navigation__link'>Аккаунт</p>
                                <div className={profileInfoClassNames}></div>
                            </NavLink>
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
