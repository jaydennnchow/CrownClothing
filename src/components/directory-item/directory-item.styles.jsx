import styled from 'styled-components'


export const BackgroundImage = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    /* 
        styled-components 支持 props 传值（固定写法）
           传： <BackgroundImage imageUrl={xxx}></BackgroundImage>
           接： ${props => props.imageUrl}
    */
    background-image: ${props => `url(${props.imageurl})`}
`

export const DirectoryItemContainer = styled.div`
    position: relative;
    min-width: 30%;
    height: 240px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    margin: 0 7.5px 15px;
    // 图片放大 的时候 不会影响 原来的盒子
    overflow: hidden;

    &:hover {
        cursor: pointer;

        & ${BackgroundImage} {
            transform: scale(1.1);
            transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
        }
    }
`

export const DirectoryItemBody = styled.div`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        height: 90px;
        padding: 0 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        background-color: #fff;
        opacity: 0.7;

        h2 {
            font-weight: bold;
            margin: 0 6px 0;
            font-size: 22px;
            color: #4a4a4a;
        }
        p {
            font-weight: lighter;
            font-size: 16px;
        }
`
