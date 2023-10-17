import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
    cards,
    isLoading,
    isUnsuccessfulSearch,
    showMovies,
    handleLikeMovieClick,
    handleDislikeMovieClick,
    savedMovies,
    isSavedMoviesList }) {

    function durationInHours(duration) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${hours}ч ${minutes}м`;
    };

    return (
        <section className='movies-list'>
            <Preloader
                isLoading={isLoading}
            />
            {isUnsuccessfulSearch ? <div className='movie-list__message'>{isUnsuccessfulSearch}</div> : null}

            <div className='movies-list__container'>
                {
                    cards.slice(0, showMovies).map((card) => (
                        <MoviesCard
                            key={card.id}
                            card={card}
                            title={card.nameRU}
                            picture={card.image.url}
                            duration={durationInHours(card.duration)}
                            trailerLink={card.trailerLink}
                            handleLikeMovieClick={handleLikeMovieClick}
                            handleDislikeMovieClick={handleDislikeMovieClick}
                            isSavedMoviesList={isSavedMoviesList}
                            savedMovies={savedMovies}
                        />
                    ))
                }

            </div>
            {isSavedMoviesList ? <div className='movies-list__devider'></div> : null}
        </section>
    )
}

export default MoviesCardList;

