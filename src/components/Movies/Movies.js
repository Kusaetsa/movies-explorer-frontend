import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import moviesApi from '../../utils/MoviesApi';
import { LARGE_SCREEN, 
  MIDDLE_SCREEN, 
  TABLET_SCREEN, 
  MOBILE_SCREEN, 
  FOUR_COLUMNS, 
  THREE_COLUMNS, 
  TWO_COLUMNS, 
  ONE_COLUMN, 
  FOUR_IN_ROW, 
  THREE_IN_ROW, 
  TWO_IN_ROW,
  SHORT_FILM_DURATION  } from '../../utils/constants';

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

  const savedIsShortFilm = JSON.parse(localStorage.getItem('savedIsShortFilm')); // сохраненный чекбокс
  const savedSearchRequest = JSON.parse(localStorage.getItem('savedSearchRequest')); // сохраненный запрос

  const [searchRequest, setSearchRequest] = React.useState(savedSearchRequest); //стейт запроса
  const [showMovies, setShowMovies] = React.useState(0); //количество фильмов на странице
  const [cardsPerLoad, setCardsPerLoad] = React.useState(0); //количество карточек в загрузке
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth); //текущая ширина экрана
  const [isbuttonMoreVisible, setIsButtonMoreVisible] = React.useState(false); //стейт видимости кнопки
  const [isShortFilm, setIsShortFilm] = React.useState(savedIsShortFilm); //стейт чекбокса короткометражек

  let allMovies = JSON.parse(localStorage.getItem('movies')); // база фильмов

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
        return movie.duration <= SHORT_FILM_DURATION;
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
    localStorage.setItem('savedSearchRequest', JSON.stringify(searchRequest));
    localStorage.setItem('savedIsShortFilm', JSON.stringify(isShortFilm));
  }

  // фильтрует фильмы и получает базу при первом поиске //
  React.useEffect(() => {
    if (searchRequest || savedIsShortFilm !== null) {
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
    }
  }, [searchRequest, isShortFilm])

  // счетчик изменения ширины //
  function handleResize() {
    setWindowWidth(window.innerWidth);
    if (windowWidth >= LARGE_SCREEN) {
      setShowMovies(FOUR_COLUMNS);
      setCardsPerLoad(FOUR_IN_ROW);
    } else if (windowWidth >= MIDDLE_SCREEN && windowWidth <= LARGE_SCREEN) {
      setShowMovies(THREE_COLUMNS);
      setCardsPerLoad(THREE_IN_ROW);
    } else if (windowWidth >= TABLET_SCREEN && windowWidth <= MIDDLE_SCREEN) {
      setShowMovies(TWO_COLUMNS);
      setCardsPerLoad(TWO_IN_ROW);
    } else if (windowWidth >= MOBILE_SCREEN && windowWidth <= TABLET_SCREEN) {
      setShowMovies(ONE_COLUMN);
      setCardsPerLoad(TWO_IN_ROW);
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
      // handleIsShortFilm={handleIsShortFilm}
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

