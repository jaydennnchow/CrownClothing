import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
// import './navigation.styles.scss'
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from './navigation.styles'
import { UserContext } from '../../context/user.component'
import { signOutUser } from '../utils/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon-component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { CartContext } from '../../context/cart.component'

const Navigation = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const { isCartOpen, cartItems } = useContext(CartContext)

    const signOutHandler = async () => {
        await signOutUser()
        setCurrentUser(null)
    }

    return (
        <>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo'></CrwnLogo>
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to={'/shop'}>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            /**
                             * NavLink as={'span'} :
                             *      as 可以 指定渲染组件时使用的HTML标签或React组件
                             *          这里是 在渲染时使用<span>标签作为容器元素
                             */
                            <NavLink as={'span'} onClick={signOutHandler}>SIGN OUT</NavLink>
                        ) : (
                            <NavLink to={'/auth'}>
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <CartIcon></CartIcon>
                </NavLinksContainer>
                {
                    isCartOpen && <CartDropdown></CartDropdown>
                }
            </NavigationContainer>
            <Outlet></Outlet>
        </>
    )
}

export default Navigation