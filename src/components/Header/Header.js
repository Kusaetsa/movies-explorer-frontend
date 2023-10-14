import './Header.css';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

function Header({isLoggedIn, handleLogin}) {

    const headerClassNames = window.location.pathname === '/' ? 'header header_blue' : 'header header_grey';

    return(
        <header className={headerClassNames}>
            <div className='header__container'>
                <Link to='/' className='header__logo-link link-hovered'></Link>
                <Navigation 
                    isLoggedIn={isLoggedIn}
                    handleLogin={handleLogin}
                />
            </div>
        </header>
    )
}

export default Header;
