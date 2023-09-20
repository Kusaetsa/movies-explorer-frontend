import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({ cards, isSavedMovies, handleSavedMovies }) {
    
    const [isLiked, setIsLiked] = React.useState(false);
    const moviesContainerClassNames = ( 
        isSavedMovies ? 'movies-list__container movies-list__saved-height' : 'movies-list__container'
      );

    function handleLike() {
        setIsLiked(true);
    }

    return (
        <section className='movies-list'>
            <div className={moviesContainerClassNames}>
            {
                cards.map((card) => (
                    <MoviesCard 
                        key={card.id}
                        card={card}
                        title={card.title}
                        duration={card.duration}
                        isLiked={isLiked}
                        handleLike={handleLike}
                        isSavedMovies={isSavedMovies}
                        handleSavedMovies={handleSavedMovies}     
                    />
                ))
            }
            </div>
            {isSavedMovies ? <div className='movies-list__devider'></div> : ''}
        </section>
    )
}

export default MoviesCardList;

