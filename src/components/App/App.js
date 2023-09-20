import './App.css';

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const location = useLocation();
  const isExistRoute = ['/', '/movies', '/saved-movies', '/profile'].includes(location.pathname);

  function handleLogin() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <div className="root">
      {isExistRoute && (
        <Header
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
        />
      )}
      
      <Routes>
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile 
          name='Виталий'
          email='pochta@yandex.ru'
        />} /> 
        <Route path='*' element={<NotFound />} />        
      </Routes>

      {isExistRoute && (
        <Footer />
      )}

    </div>

  );
}

export default App;
