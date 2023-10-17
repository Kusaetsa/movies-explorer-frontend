import React from 'react';
import './Input.css';

function Input({ id, type, placeholder, labelText, name, value, onChange, errorText, reference }) {

    const inputTextClassNames = (errorText ? 'input__input input__input_invalid' : 'input__input')

    return (
        <div className='input'>
            <label htmlFor={id} className='input__label'>{labelText}</label>
            <input 
                ref={reference} 
                className={inputTextClassNames} 
                required id={id} 
                type={type} 
                value={value} 
                name={name} 
                placeholder={placeholder} 
                onChange={onChange}
            />
            <span className='input__error'>{errorText}</span>
        </div>
    )
}

export default Input;

