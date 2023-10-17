import React from 'react';
import './FilterCheckbox.css'

function FilterCheckbox({ setIsShortFilm, isShortFilm, isSavedMoviesList }) { 

    function handleIsShortFilm() {
        setIsShortFilm(!isShortFilm);
    }
  
    React.useEffect(() => { //при повторном посещении восстанавливает состояние чекбокса
      //  const savedSearchValue = JSON.parse(localStorage.getItem('savedIsShortFilm'));
        if (isSavedMoviesList) {
            setIsShortFilm(false);
            return;
        } 
    }, [isSavedMoviesList]);


    return (
        <div className='checkbox'>
            <div className='checkbox__container' onClick={handleIsShortFilm}>
                <div className={`checkbox__handler ${(isShortFilm) ? 'checkbox__handler_on' : 'checkbox__handler_off'}`}></div>
            </div>
            <p className='checkbox__caption'>Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox;