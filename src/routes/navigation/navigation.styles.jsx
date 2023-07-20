import { Link } from 'react-router-dom'
import styled from 'styled-components'


/**
 * 创建了一个名为 NavigationContainer 的组件，并定义了其样式
 * 可以使用普通的 CSS 属性和值，将它们放入模板字面量中定义样式
 */
export const NavigationContainer = styled.div`
height: 70px;
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 25px;
background-color: pink;
font-weight: bold;
`

export const LogoContainer = styled(Link)`
display: block;
height: 100%;
width: 70px;
padding: 15px;
`

export const NavLinksContainer = styled.div`
height: 100%;
width: 50%;
display: flex;
justify-content: flex-end;
align-items: center;
`

export const NavLink = styled(Link)`
padding: 10px 15px;
cursor: pointer;
`