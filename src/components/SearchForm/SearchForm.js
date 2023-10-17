import React from 'react';
import searchIcon from '../../images/search-icon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'

function SearchForm({ 
    onSearchRequest, 
    setIsShortFilm, 
    isShortFilm, 
    handlePopupOpenClick, 
    isSavedMoviesList  }) {

    const searchFormRef = React.useRef();

    function sendSearchRequest(request) {
        onSearchRequest(request); //отправляет поисковый запрос в родительские компоненты
    }
    
    // сабмит формы поиска //
    function handleSubmit(e) {
        e.preventDefault();
        if (!isSavedMoviesList) {
            if (searchFormRef.current.value === '') {
                handlePopupOpenClick(); //при пустом запросе открыть попап с ошибкой
                return
            }
        } 
        sendSearchRequest(searchFormRef.current.value);
    //    localStorage.setItem('savedSearchRequest', JSON.stringify(searchFormRef.current.value));
    }

    React.useEffect(() => { //при повторном посещении восстанавливаем запрос в поисковой строке
        const savedSearchValue = JSON.parse(localStorage.getItem('savedSearchRequest'));
        if (savedSearchValue !== null) {
            searchFormRef.current.value = savedSearchValue;
        }
        if (isSavedMoviesList) {
            searchFormRef.current.value = '';
        }
    }, [])

    return (
        <section className='search-form'>
            <div className='search-form__container'>
                <form className='search-form__form' method='post' noValidate>
                    <img src={searchIcon} className='search-form__icon' alt='поиск' />
                    <input
                        id="place-input" 
                        type='text' 
                        className="search-form__input" 
                        name='searchFilm' 
                        placeholder='Фильм'
                        ref={searchFormRef}
                    />
                    <div className='search-form__button-container'>
                    <button onClick={handleSubmit} type='submit' className='search-form__button button-hovered' name='button-submit'>Найти</button>

                    </div>
                </form>
                <FilterCheckbox 
                    setIsShortFilm={setIsShortFilm}
                    isShortFilm={isShortFilm}
                    isSavedMoviesList={isSavedMoviesList}
                 //   handleIsShortFilm={handleIsShortFilm}
                />
            </div>
            <div className='search-form__border'></div>
        </section>
        
    )
}

export default SearchForm;