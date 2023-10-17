import React from 'react';
import './ErrorPopup.css'

function ErrorPopup({ isPopupOpen, message, closePopup }) {

    //закрыть по оверлею//    
    function handleOverlayClose(e) {
        if (e.target.classList.contains('error-popup_opened')) {
            closePopup();
        }
    }        

    //закрыть на ESC//
    function handleEscClose(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    }

    React.useEffect(() => {
        if (isPopupOpen) {
            document.addEventListener('keydown', handleEscClose);
        }
        return () => {
            document.removeEventListener('keydown', handleEscClose);
        };
        }, [isPopupOpen]);



    return (
        <section className={`error-popup ${isPopupOpen ? 'error-popup_opened' : ''}`} onClick={handleOverlayClose}>
            <div className='error-popup__container'>
                <div className='error-popup__popup'>
                    <div className='error-popup__image'>!</div>
                    <p className='error-popup__message'>{message}</p>
                </div>
                <button className='error-popup__button' type="button" name="button-close" onClick={closePopup} />
            </div>    
        </section>
    )
}

export default ErrorPopup;