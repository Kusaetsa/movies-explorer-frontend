import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  savedMovies,
  isLoading,
  isUnsuccessfulSearch,
  handleDislikeMovieClick,
  setIsShortFilm,
  isShortFilm,
  handlePopupOpenClick,
  setIsUnsuccessfulSearch }) {


  const [isSavedMoviesList, setIsSavedMoviesList] = React.useState(true); // стейт списка сохраенных фильмов
  const [savedMoviesSearchRequest, setSavedMoviesSearchRequest] = React.useState(''); // стейт запроса по сохраненным фильмам    
  const [foundSavedMovies, setFoundSavedMovies] = React.useState([]); //стейт отфильтрованного массива сохраненных фильмов

  // поисковый запрос из строки поиска // 
  function handleSavedMoviesSearchRequest(searchRequest) {
    setSavedMoviesSearchRequest(searchRequest);
  }

  // следит за сохраненными фильмами при удалении карточки //
  React.useEffect(() => {
    setFoundSavedMovies(savedMovies);
  }, [savedMovies])


  // фильтр по сохраеннным фильмам //
  React.useEffect(() => {
    const filteredMovies = savedMovies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(savedMoviesSearchRequest.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(savedMoviesSearchRequest.toLowerCase())
      );
    });
    if (isShortFilm) {
      const filteredShortMovies = filteredMovies.filter((movie) => {
        return movie.duration <= 40;
      });
      filteredShortMovies.length === 0 ? setIsUnsuccessfulSearch('Ничего не найдено') : setIsUnsuccessfulSearch('');
      setFoundSavedMovies(filteredShortMovies);
    } else {
      filteredMovies.length === 0 ? setIsUnsuccessfulSearch('Ничего не найдено') : setIsUnsuccessfulSearch('');
      setFoundSavedMovies(filteredMovies);
    }
  }, [savedMoviesSearchRequest, isShortFilm])



  return (
    <main className='movies'>
      <SearchForm
        onSearchRequest={handleSavedMoviesSearchRequest}
        setIsShortFilm={setIsShortFilm}
        isShortFilm={isShortFilm}
        handlePopupOpenClick={handlePopupOpenClick}
        isSavedMoviesList={isSavedMoviesList}
      />
      <MoviesCardList
        cards={foundSavedMovies}
        isLoading={isLoading}
        isUnsuccessfulSearch={isUnsuccessfulSearch}
        handleDislikeMovieClick={handleDislikeMovieClick}
        savedMovies={savedMovies}
        isSavedMoviesList={isSavedMoviesList}
      />
    </main>
  )
}

export default SavedMovies;

