import React from 'react'
import { BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton } from './button.styles'

const BUTTON_TYPE_CLASSES = {
    base: 'base',
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
    const { children, buttonType, isLoading, ...otherProps } = props
    const CustomButton = getButton(buttonType)

    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner></ButtonSpinner> : children}
        </CustomButton>
    )
}

export default Button