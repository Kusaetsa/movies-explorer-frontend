import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { likedFilmsArray } from '../../utils/likedFilmsArray';

function SavedMovies() {

    const [isSavedMovies, setIsSavedMovies] = React.useState(true);

    function handleSavedMovies() {
        setIsSavedMovies(false);
    }

    return (
        <main className='movies'>
            <SearchForm />
            <MoviesCardList 
                cards={likedFilmsArray}
                isSavedMovies={isSavedMovies}
                handleSavedMovies={handleSavedMovies}
            />
        </main>
    )
}


export default SavedMovies;


//            <Preloader />