import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';
import ErrorPopup from '../ErrorPopup/ErrorPopup';


function Movies({
  isLoading,
  handleSearchRequest,
  setIsShortFilm,
  isShortFilm,
  foundMovies,
  setFoundMovies,
  isPopupOpen,
  handlePopupOpenClick,
  closePopup,
  isUnsuccessfulSearch,
  handleLikeMovieClick,
  handleDislikeMovieClick,
  savedMovies }) {

  const [showMovies, setShowMovies] = React.useState(0); //количество фильмов на странице
  const [cardsPerLoad, setCardsPerLoad] = React.useState(0); //количество карточек в загрузке
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth); //текущая ширина экрана
  const [isbuttonMoreVisible, setIsButtonMoreVisible] = React.useState(false); //стейт видимости кнопки


  // счетчик изменения ширины //
  function handleResize() {
    setWindowWidth(window.innerWidth);
    if (windowWidth >= 1280) {
      setShowMovies(16);
      setCardsPerLoad(4);
    } else if (windowWidth >= 768) {
      setShowMovies(8);
      setCardsPerLoad(4);
    } else if (windowWidth >= 320 && windowWidth <= 480) {
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

  //восстанавливает результатов сохраненного поиска //
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

