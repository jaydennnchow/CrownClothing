import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from './navigation.styles'
// import { UserContext } from '../../context/user.component'
import { useSelector, useDispatch } from 'react-redux'
import { signOutUser } from '../utils/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon-component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
// import { CartContext } from '../../context/cart.component'
import { getCurrentUser } from '../../store/user/user.selector'
import { setCurrentUser, signOutStart } from '../../store/user/user.action'
import { selectIsCartOpen } from '../../store/cart/cart.selector'

const Navigation = () => {

    // const { currentUser, setCurrentUser } = useContext(UserContext)

    /**
     * state: the entire state object in Redux store
     * state.user: the userReducer
     * state.user.currentUser: the actual value in the userReducer
     */
    // const currentUser = useSelector(state => state.user.currentUser)
    const currentUser = useSelector(getCurrentUser)
    const dispatch = useDispatch()
    // const { isCartOpen, cartItems } = useContext(CartContext)
    const isCartOpen = useSelector(selectIsCartOpen)

    const signOutHandler = async () => {
        // await signOutUser()
        // dispatch(setCurrentUser(null))
        dispatch(signOutStart())
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