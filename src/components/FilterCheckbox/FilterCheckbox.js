import React from 'react';
import './FilterCheckbox.css'

function FilterCheckbox() {

    const [isCheckboxOn, setCheckboxon] = React.useState(false);

    function handleCheckbox() {
        setCheckboxon(!isCheckboxOn);
    }

    return (
        <div className='checkbox'>
            <div className='checkbox__container' onClick={handleCheckbox}>
                <div className={`checkbox__handler ${isCheckboxOn ? 'checkbox__handler_on' : 'checkbox__handler_off'}`}></div>
            </div>
            <p className='checkbox__caption'>Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox;