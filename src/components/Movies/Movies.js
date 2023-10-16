import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import moviesApi from '../../utils/MoviesApi';

function Movies({
  isLoading,
  foundMovies,
  setFoundMovies,
  isPopupOpen,
  handlePopupOpenClick,
  closePopup,
  isUnsuccessfulSearch,
  handleLikeMovieClick,
  handleDislikeMovieClick,
  savedMovies,
  setIsLoading,
  setIsUnsuccessfulSearch }) {

  const [searchRequest, setSearchRequest] = React.useState(''); //стейт запроса
  const [showMovies, setShowMovies] = React.useState(0); //количество фильмов на странице
  const [cardsPerLoad, setCardsPerLoad] = React.useState(0); //количество карточек в загрузке
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth); //текущая ширина экрана
  const [isbuttonMoreVisible, setIsButtonMoreVisible] = React.useState(false); //стейт видимости кнопки
  const [isShortFilm, setIsShortFilm] = React.useState(false); //стейт чекбокса короткометражек

  let allMovies = JSON.parse(localStorage.getItem('movies'));

  // получает запрос из дочернего компонента //
  function handleSearchRequest(searchRequest) {
    setSearchRequest(searchRequest);
  }

  // фильтр фильмов //
  function filterMovies() {
    const filteredMovies = allMovies.filter((movie) => { //массив поиска всех фильмов
      return (
        movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchRequest.toLowerCase())
      );
    });
    if (isShortFilm) {
      const filteredShortMovies = filteredMovies.filter((movie) => { //массив поиска короткометражек
        return movie.duration <= 40;
      });
      filteredShortMovies.length === 0 ? setIsUnsuccessfulSearch('Ничего не найдено') : setIsUnsuccessfulSearch('');
      setFoundMovies(filteredShortMovies);
      localStorage.setItem('savedFoundMovies', JSON.stringify(filteredShortMovies));
    } else {
      filteredMovies.length === 0 ? setIsUnsuccessfulSearch('Ничего не найдено') : setIsUnsuccessfulSearch('');
      setFoundMovies(filteredMovies);
      localStorage.setItem('savedFoundMovies', JSON.stringify(filteredMovies));
      handleResize();
    }
    localStorage.setItem('savedIsShortFilm', JSON.stringify(isShortFilm));
  }

  // фильтрует фильмы и получает базу при первом поиске //
  React.useEffect(() => {
    if (searchRequest) {
      if (allMovies === null) {
        setIsLoading(true);
        moviesApi.getAllMovies()
          .then((data) => {
            localStorage.setItem('movies', JSON.stringify(data));
            allMovies = JSON.parse(localStorage.getItem('movies'));
          })
          .then(() => {
            filterMovies();
          })
          .catch((err) => {
            setIsUnsuccessfulSearch('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
            console.log(`Ошибка загрузки фильмов: ${err}`);
          })
          .finally(() => {
            setIsLoading(false);
          })
      } else {
        filterMovies();
      }
    } else {
      return;
    }
  }, [searchRequest, isShortFilm])

  // счетчик изменения ширины //
  function handleResize() {
    setWindowWidth(window.innerWidth);
    if (windowWidth >= 1180) {
      setShowMovies(16);
      setCardsPerLoad(4);
    } else if (windowWidth >= 1001 && windowWidth <= 1180) {
      setShowMovies(9);
      setCardsPerLoad(3);
    } else if (windowWidth >= 768 && windowWidth <= 1000) {
      setShowMovies(8);
      setCardsPerLoad(2);
    } else if (windowWidth >= 320 && windowWidth <= 765) {
      setShowMovies(5);
      setCardsPerLoad(2);
    }
  }

  // вызывает эффект при изменениии ширины экрана и монтировании компонента//
  React.useEffect(() => {
    handleResize();
    setTimeout(() => {
      window.addEventListener('resize', handleResize);
    }, 100);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);


  // загружает больше карточек //
  function handleLoadMore() {
    setShowMovies(showMovies => showMovies + cardsPerLoad);
    if (foundMovies.length <= (showMovies + cardsPerLoad)) {
      setIsButtonMoreVisible(false); //отключить видимость кнопки
    }
  };

  //восстанавливает результаты сохраненного поиска //
  React.useEffect(() => {
    const savedFoundMovies = JSON.parse(localStorage.getItem('savedFoundMovies'));
    if (savedFoundMovies === null) {
      setIsButtonMoreVisible(false);
      return;
    }
    setFoundMovies(savedFoundMovies); // при повторном визите подставляет массив из локального хранилища 
    if (foundMovies.length > showMovies) {
      setIsButtonMoreVisible(true);
    } else {
      setIsButtonMoreVisible(false);
    }
  }, [showMovies])

  //определяет видимость кнопки Еще //
  React.useEffect(() => {

    if (foundMovies.length > showMovies) {
      setIsButtonMoreVisible(true);
    } else {
      setIsButtonMoreVisible(false);
    }
  }, [foundMovies])

  return (
    <main className='movies'>
      <SearchForm
        onSearchRequest={handleSearchRequest}
        setIsShortFilm={setIsShortFilm}
        isShortFilm={isShortFilm}
        handlePopupOpenClick={handlePopupOpenClick}
      />
      <MoviesCardList
        cards={foundMovies}
        isLoading={isLoading}
        isUnsuccessfulSearch={isUnsuccessfulSearch}
        showMovies={showMovies}
        handleLikeMovieClick={handleLikeMovieClick}
        handleDislikeMovieClick={handleDislikeMovieClick}
        savedMovies={savedMovies}
      />

      {isbuttonMoreVisible ? (
        <Button buttonText='Ещё'
          handleLoadMore={handleLoadMore}
        />
      ) : null}
      {
        isPopupOpen ? <ErrorPopup
          message='Нужно ввести ключевое слово'
          isPopupOpen={isPopupOpen}
          handlePopupOpenClick={handlePopupOpenClick}
          closePopup={closePopup}
        /> : null
      }
    </main>
  );
}

export default Movies;

