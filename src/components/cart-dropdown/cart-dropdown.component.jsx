import React, { useContext } from 'react'
import Button from '../button/button.component'
// import { CartContext } from '../../context/cart.component'
import CartItem from '../cart-item/cart-item.component'
import { useNavigate } from 'react-router-dom'
import { CartDropdownContainer,CartItems,EmptyMessage } from './cart-dropdown.styles'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'

const CartDropdown = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const {cartItems,setIsCartOpen} = useContext(CartContext)
  const cartItems = useSelector(selectCartItems)

  const goToCheckout = () => {
    dispatch(setIsCartOpen(false))
    navigate('checkout')
  }

  return (
    <CartDropdownContainer>
        <CartItems>
          {
            cartItems.length >0  ? (
              cartItems.map(item => <CartItem key={item.id} product={item}></CartItem>)
            ) : <EmptyMessage>Your cart is empty</EmptyMessage>
          }
        </CartItems>
        <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown