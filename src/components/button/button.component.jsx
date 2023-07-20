import React from 'react'
import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles'

const BUTTON_TYPE_CLASSES = {
    base:'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
    switch (buttonType) {
        case 'base':
            return BaseButton
        case 'google':
            return GoogleSignInButton
        case 'inverted':
            return InvertedButton
        default:
            return BaseButton
    } 
}

const Button = (props) => {
    const { children, buttonType, ...otherProps } = props
    const CustomButton = getButton(buttonType)

    return (
        <CustomButton {...otherProps}>
            {children}
        </CustomButton>
    )
}

export default Button