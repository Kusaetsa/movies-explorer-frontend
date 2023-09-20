import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';
import {initialFilmsArray} from '../../utils/initialFilmsArray';

function Movies() {

    return (
        <main className='movies'>
            <SearchForm />
            <MoviesCardList 
            cards={initialFilmsArray}
            />
            <Button 
                buttonText = 'Ещё'
            />
        </main>
    )
}

export default Movies;


//            <Preloader />