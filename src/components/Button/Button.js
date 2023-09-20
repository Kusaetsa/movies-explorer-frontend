import React from 'react';
import './Button.css'

function Button({buttonText}) {


    return (
        <section className='button-more__container'>
            <button className='button-more__button button_hovered'>{buttonText}</button>
        </section>
    )
}

export default Button;