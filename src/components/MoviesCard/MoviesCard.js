import React from 'react';
import './MoviesCard.css'

function MoviesCard({
    card,
    title,
    picture,
    duration,
    trailerLink,
    handleLikeMovieClick,
    handleDislikeMovieClick,
    isSavedMoviesList,
    savedMovies,
    }) {

    let isLiked = savedMovies.some((movie) => movie.id === card.id);    

    // добавляет _id к ранее сохраненным карточкам, чтобы их можно было удалять //
    React.useEffect(() => {
        const isThisMovieSaved = savedMovies.find((movie) => movie.id === card.id);
        if (isThisMovieSaved) {
            card._id = isThisMovieSaved._id;
        } else {
            card._id = null;
        }
    }, [savedMovies])


    function handleLikeClick() { //поставить лайк + добавить фильм в коллекцию
        handleLikeMovieClick(card);
    }

    function handleDisLikeClick() { //убрать лайк + удалить фильм из коллекции
        handleDislikeMovieClick(card);
    } 

    return (
        <article className='movie-card'>
            <a style={{ backgroundImage: `url(https://api.nomoreparties.co/${picture})` }} href={trailerLink} className='movie-card__image-container'> </a>
            <div className='movie-card__info'>
                <h2 className='movie-card__header'>{title}</h2>
                {isSavedMoviesList
                    ? (<button className='movie-card__close-icon button-hovered' onClick={handleDisLikeClick}></button>
                    ) : (
                        <>
                            {isLiked
                                ? (<button className='movie-card__like button-hovered movie-card__like_on movie-card__animation' onClick={handleDisLikeClick}>
                                    <span className='movie-card__like-mask'></span>
                                </button>
                                ) : (<button className='movie-card__like button-hovered movie-card__like_off' onClick={handleLikeClick}>
                                    <span className='movie-card__like-mask'></span>
                                </button>)
                            }
                        </>
                    )
                }
            </div>
            <p className='movie-card__duration'>{duration}</p>
        </article>
    )
}

export default MoviesCard;
