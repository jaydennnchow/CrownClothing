import React from 'react'
// import './form-input.styles.scss'
import { FormInputLabel, Group, Input } from './form-input.styles'

const FormInput = (props) => {
    const { label, ...otherProps } = props
    return (
        <Group>
            <Input
                {...otherProps}
            ></Input>
            {label && (
                <FormInputLabel shrink={otherProps.value.length > 0 ? true : false} >
                    {label}
                </FormInputLabel>
            )}
        </Group>
    )
}

export default FormInput