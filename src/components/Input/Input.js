import React from 'react';
import './Input.css';

function Input({ id, type, ref, labelText, errorText, value }) {

    return (
        <div className='input__container'>
            <label for='email-input' className='input__label'>{labelText}</label>
            <input className='input__input' required id={id} type={type} value={value} ref={ref}/>
            <span className='input__error'>{errorText}</span>
        </div>
    )
}

export default Input;