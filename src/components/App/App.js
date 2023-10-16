import './App.css';

import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

//import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = React.useState({}); //стейт пользователя
  const [isLoggedIn, setIsLoggedIn] = React.useState(null); //стейт авторизации
  const [isPopupOpen, setIsPopupOpen] = React.useState(false); //состояние попапа с ошибкой
  const [isLoading, setIsLoading] = React.useState(false); //стейт обработки запросов
  const [foundMovies, setFoundMovies] = React.useState([]); //стейт отфильтрованного массива фильмов
  const [isUnsuccessfulSearch, setIsUnsuccessfulSearch] = React.useState(''); //неудачный поиск
  const [savedMovies, setSavedMovies] = React.useState([]); //стейт сохраненных фильмов
  const [apiMessage, setApiMessage] = React.useState(''); // вывод сообщений от апи


  const jwt = localStorage.getItem('jwt');

  React.useEffect(() => {
    Promise.all([
      mainApi.getUserInfo(jwt),
      mainApi.getSavedMovies(jwt)
    ])
      .then(([userInfo, savedMovies]) => {
        // проверка токена для автоматического входа //
        if (userInfo) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        // установка данных пользователя //
        setCurrentUser({
          name: userInfo.name,
          email: userInfo.email,
        });
        // получение сохраненных фильмов //
        setSavedMovies(savedMovies.map((item) => ({
          _id: item._id,
          country: item.country,
          description: item.description,
          director: item.director,
          duration: item.duration,
          image: { url: new URL(item.image).pathname },
          id: item.movieId,
          nameEN: item.nameEN,
          nameRU: item.nameRU,
          owner: item.owner,
          thumbnail: item.thumbnail,
          trailerLink: item.trailerLink,
          year: item.year
        })));
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(`Ошибка при получении данных: ${err}`);
      });
  }, [jwt]);

  // переключатель авторизации
  function handleLogin() {
    setIsLoggedIn(true);
  }

  // открыть попап с ошибкой //
  function handlePopupOpenClick() {
    setIsPopupOpen(true);
  }

  // закрыть попап с ошибкой //
  function closePopup() {
    setIsPopupOpen(false);
  }

  // обновление данных пользователя //
  function handleUpdateUser(data) {
    mainApi.updateUserInfo(data, jwt)
      .then((data) => {
        setCurrentUser(data);
        setApiMessage('Данные успешно обновлены');
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setApiMessage('Пользователь с таким email уже существует')
        } else if (err === 'Ошибка: 500') {
          setApiMessage('На сервере произошла ошибка');
        } else {
          setApiMessage('При обновлении профиля произошла ошибка');
        }
        console.log(`Ошибка в форме обновления данных пользователя: ${err}`)
      })
  };

  // постановка лайка - оно же добавление фильма в коллекцию //
  function handleLikeMovieClick(movie) {
    mainApi.handleLikeMovie(movie, jwt)
      .then((data) => {
        const relativeImageUrl = new URL(data.image).pathname;
        const relativeThumbnailUrl = new URL(data.thumbnail).pathname;
        movie.country = data.country;
        movie.director = data.director;
        movie.duration = data.duration;
        movie.year = data.year;
        movie.description = data.description;
        movie.image.url = relativeImageUrl;
        movie.trailerLink = data.trailerLink;
        movie.thumbnail = relativeThumbnailUrl;
        movie.nameRU = data.nameRU;
        movie.nameEN = data.nameEN;
        movie._id = data._id;
        setSavedMovies([...savedMovies, movie]);
      })
      .catch((err) => {
        console.log(`Ошибка при постановке лайка: ${err}`)
      })
  }

  // удаление лайка - оно же удаляет фильм из коллекции //
  function handleDislikeMovieClick(movie) {
    mainApi.handleDisikeMovie(movie, jwt)
      .then(
        setSavedMovies((state) =>
          state.filter((i) => {
            return i._id !== movie._id
          }))
      )
      .catch((err) => {
        console.log(`Ошибка при установке дизлайка: ${err}`)
      })
  }

 
  // отображение роутов //
  const location = useLocation();
  const isHeaderVisible = ['/', '/movies', '/saved-movies', '/profile'].includes(location.pathname);
  const isFooterVisible = ['/', '/movies', '/saved-movies'].includes(location.pathname);


  return (
    <div className='root'>
      <CurrentUserContext.Provider value={currentUser}>
        {isHeaderVisible && (
          <Header
            isLoggedIn={isLoggedIn}
          />
        )}

        <Routes>
          <Route path='/signin' element={isLoggedIn ? <Navigate to='/movies' /> : <Login
            handleLogin={handleLogin}
            setCurrentUser={setCurrentUser}
            isPopupOpen={isPopupOpen}
            handlePopupOpenClick={handlePopupOpenClick}
            closePopup={closePopup}
            apiMessage={apiMessage}
            setApiMessage={setApiMessage}
          />} />
          <Route path='/signup' element={isLoggedIn ? <Navigate to='/movies' /> : <Register
            handleLogin={handleLogin}
            setCurrentUser={setCurrentUser}
            isPopupOpen={isPopupOpen}
            handlePopupOpenClick={handlePopupOpenClick}
            closePopup={closePopup}
            apiMessage={apiMessage}
            setApiMessage={setApiMessage}
          />} />
          <Route path='/' element={<Main />} />

          <Route
            path='/movies'
            element={<ProtectedRouteElement
              element={Movies}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              foundMovies={foundMovies}
              setFoundMovies={setFoundMovies}
              isPopupOpen={isPopupOpen}
              handlePopupOpenClick={handlePopupOpenClick}
              closePopup={closePopup}
              isUnsuccessfulSearch={isUnsuccessfulSearch}
              handleLikeMovieClick={handleLikeMovieClick}
              handleDislikeMovieClick={handleDislikeMovieClick}
              savedMovies={savedMovies}
              setIsLoading={setIsLoading}
              setIsUnsuccessfulSearch={setIsUnsuccessfulSearch}
            />}
          />

          <Route path='/saved-movies'
            element={<ProtectedRouteElement
              element={SavedMovies}
              isLoading={isLoading}
              isUnsuccessfulSearch={isUnsuccessfulSearch}
              handleDislikeMovieClick={handleDislikeMovieClick}
              savedMovies={savedMovies}
              handlePopupOpenClick={handlePopupOpenClick}
              setIsUnsuccessfulSearch={setIsUnsuccessfulSearch}
              isLoggedIn={isLoggedIn}
            />} />

          <Route path='/profile'
            element={<ProtectedRouteElement
              element={Profile}
              onUpdateUser={handleUpdateUser}
              profileMessage={apiMessage}
              setCurrentUser={setCurrentUser}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              setFoundMovies={setFoundMovies}
              setApiMessage={setApiMessage}
            />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>

      {isFooterVisible && (
        <Footer />
      )}


    </div>

  );
}


export default App;
