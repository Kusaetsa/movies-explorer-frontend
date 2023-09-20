import './Navigation.css';
import React from 'react';
import { Link } from "react-router-dom";

function Navigation({isLoggedIn, handleLogin}) {

    const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

    function handleBurgerOpen() {
        setIsBurgerOpen(!isBurgerOpen);
    }

    const menuClassNames = ( 
        !isBurgerOpen ? 'navigation__burger' : 'navigation__close-icon'
      );

    return(
        <nav className='navigation'>
                {isLoggedIn 
                    ? (
                        <>
                        <div className={menuClassNames} onClick={handleBurgerOpen}></div>
                        <div className= {`navigation__container ${isBurgerOpen ? 'navigation__container_side-open' : ''}`}>
                            <div className='navigation__links-container'>
                                <Link to='/' className='navigation__link link_hovered navigation__link_main'>Главная</Link>                                 
                                <Link to='/movies' className='navigation__link link_hovered navigation__link_focus'>Фильмы</Link>
                                <Link to='/saved-movies' className='navigation__link link_hovered'>Сохраненные фильмы</Link>
                            </div>
                            <Link to='/profile' className='navigation__user-container'>
                                <p className='navigation__link link_hovered'>Аккаунт</p>
                                <div className='navigation__profile-icon'></div>
                            </Link>
                        </div>
                        </>
                    ) : (
                        <div className='navigation__buttons-container'>
                            <Link to='/signup' className='navigation__register-link link_hovered'>Регистрация</Link>
                            <Link to='/signin' className='navigation__login-button button_hovered'>Войти</Link>
                        </div>
                    )
                }            
        </nav>
    )
}

export default Navigation;
