import React from 'react';
import './Button.css'

function Button({buttonText, handleLoadMore}) {


    return (
        <section className='button'>
            <button className='button__button button-hovered' onClick={handleLoadMore}>{buttonText}</button>
        </section>
    )
}

export default Button;