import React from 'react';
import './FilterCheckbox.css'

function FilterCheckbox({ setIsShortFilm, isShortFilm }) { 

    const savedSearchValue = JSON.parse(localStorage.getItem('savedIsShortFilm'));

    function handleCheckbox() {
        setIsShortFilm(!isShortFilm);
    }
  
    React.useEffect(() => { //при повторном посещении восстанавливает состояние чекбокса

        if (savedSearchValue === null) {
            setIsShortFilm(false);
            return;
        } else {
           setIsShortFilm(savedSearchValue);
        }
    }, []);


    return (
        <div className='checkbox'>
            <div className='checkbox__container' onClick={handleCheckbox}>
                <div className={`checkbox__handler ${isShortFilm ? 'checkbox__handler_on' : 'checkbox__handler_off'}`}></div>
            </div>
            <p className='checkbox__caption'>Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox;