import React from 'react';

import './custom-button.styles.scss'

<<<<<<< HEAD
const CustomButton = ({children, isGoogleSignIn, ...otherProps}) => (
    <button 
        className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}> 
=======
const CustomButton = ({children, isGoogleSignIn, inverted, ...otherProps}) => (
    <button 
        className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}> 
>>>>>>> added card icon and cart dropdown
        {children}
    </button>
)

export default CustomButton