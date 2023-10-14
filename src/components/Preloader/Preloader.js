import React from 'react'
import './Preloader.css'

const Preloader = ({isLoading}) => {
    const preloaderClassNames = (isLoading ? 'preloader' : 'preloader-hidden');
    return (
        <div className={preloaderClassNames}>
            <div className='preloader__container'>
                <span className='preloader__round'></span>
            </div>
        </div>
    )
};

export default Preloader
