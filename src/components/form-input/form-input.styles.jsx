import styled, { css } from 'styled-components'

// 对应 $sub-color: grey;
const subColor = 'grey'
const mainColor = 'black'

// 对应 @mixin shrinkLabel {}
const shrinkLabelStyles = css`
    top: -14px;
    font-size: 12px;
    color: ${mainColor};
`

export const FormInputLabel = styled.label`
        position: absolute;
        left: 5px;
        top: 10px;
        pointer-events: none;
        color: ${subColor};
        font-size: 16px;
        font-weight: normal;
        transition: all 300ms ease;

        ${props => props.shrink && shrinkLabelStyles}
`

export const Input = styled.input`
        background: none;
        background-color: #fff;
        color: ${subColor};
        font-size: 18px;
        padding: 10px 10px 10px 5px;
        margin: 25px 0;
        display: block;
        width: 100%;
        border: none;
        border-radius: 0;
        border-bottom: 1px solid ${subColor};

        &:focus{
            outline: none;
        }

        &:focus ~ ${FormInputLabel} {
            ${shrinkLabelStyles}
        }
`

export const Group = styled.div`
    position: relative;
    margin: 45px 0;

    input[type='password'] {
        letter-spacing: 0.3em;
    }
`