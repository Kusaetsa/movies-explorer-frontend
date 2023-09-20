import './Header.css';
import React from 'react';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({isLoggedIn, handleLogin}) {

    const headerClassNames = window.location.pathname === '/' ? 'header header_blue' : 'header header_grey';

    return(
        <header className={headerClassNames}>
            <div className='header__container'>
                <a href='/' className='header__main-link'>
                    <img src={logo} className='header__logo' alt='логотип' />
                </a>
                <Navigation 
                    isLoggedIn={isLoggedIn}
                    handleLogin={handleLogin}
                />
            </div>
        </header>
    )
}

export default Header;
