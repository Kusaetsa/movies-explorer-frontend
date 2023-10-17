import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ element: Component, isLoggedIn, ...props }) => {


    if (isLoggedIn !== null) {
        return isLoggedIn ? <Component {...props} /> : <Navigate to='/' replace />;
    } 
}

export default ProtectedRouteElement;