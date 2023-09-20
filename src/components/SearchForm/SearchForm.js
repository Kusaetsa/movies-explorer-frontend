import React from 'react';
import searchIcon from '../../images/search-icon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'

function SearchForm() {
    return (
        <section className='search-form'>
            <div className='search-form__container'>
                <form className='search-form__form' method="post" noValidate>
                    <img src={searchIcon} className='search-form__icon' alt='поиск' />
                    <input
                        id="place-input" 
                        type="text" 
                        className="search-form__input" 
                        name="searchFilm" 
                        placeholder="Фильм" 
                    />
                    <div className='search-form__button-container'>
                    <button type="submit" className="search-form__button button_hovered" name="button-submit">Найти</button>

                    </div>
                </form>
                <FilterCheckbox />
            </div>
            <div className='search-form__border'></div>
        </section>
    )
}

export default SearchForm;