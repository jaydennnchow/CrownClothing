import styled from 'styled-components'
import { BaseButton, GoogleSignInButton, InvertedButton } from '../button/button.styles'

export const CartDropdownContainer = styled.div`
    position: absolute;
    top: 90px;
    right: 20px;
    z-index: 5;
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 380px;
    padding: 20px;
    border: 1px solid black;
    background-color: #fff;

    /* button{
        margin-top: auto;
        margin-bottom: 0;
        font-weight: bold;
    } */

    /* 
        可以使用变量（这里是 自己创建的BaseButton），
        但是要确保 变量 在使用时就已经创建好
        例如：如果这里使用 EmptyMessage，就会 无效，因为 EmptyMessage 还没创建 
        因此，在 创建变量 时，要 考虑好先后顺序
    */
    ${BaseButton}{
        margin-top: auto;
        margin-bottom: 0;
        font-weight: bold;
    }
`

export const EmptyMessage = styled.span`
    font-size: 18px;
    margin: auto auto;
`

export const CartItems = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    overflow: auto;
`