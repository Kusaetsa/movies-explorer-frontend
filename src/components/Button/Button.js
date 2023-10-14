import React from 'react';
import './Button.css'

function Button({buttonText}) {


    return (
        <section className='button'>
            <button className='button__button button-hovered'>{buttonText}</button>
        </section>
    )
}

export default Button;