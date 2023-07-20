import styled from 'styled-components'

// styled-components 相当于 将 每个类名className 独立 写成一个 变量

export const BaseButton = styled.button`
    display: flex;
    justify-content: center;
    /* min-width: 165px; */
    width: auto;
    height: 50px;
    margin-bottom: 20px;
    padding: 0 35px;
    letter-spacing: 0.5px;
    line-height: 50px;
    font-size: 15px;
    background-color: black;
    color: white;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bold;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #fff;
        color: black;
        border: 1px solid black;
    }
`
/**
 * styled(BaseButton) : 
 *     GoogleSignInButton 可以继承 BaseButton 的 样式，
 *     然后在此基础上，进行个性化 修改
 */
export const GoogleSignInButton = styled(BaseButton)`
    background-color: #4285f4;
    color: white;

    &:hover {
        background-color: #357ae8;
        border: none;
    }
`

export const InvertedButton = styled(BaseButton)`
    background-color: #fff;
    color: black;
    border: 1px solid black;

    &:hover {
        background-color: black;
        color: #fff;
        border: none;
    }
`