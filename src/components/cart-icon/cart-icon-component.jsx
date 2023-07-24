import React, { useContext } from 'react'
import { CartContext } from '../../context/cart.component'
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon-styles'

const CartIcon = () => {

  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

  const toggleIsCartOpen = () => {
    console.log(!isCartOpen);
    setIsCartOpen(!isCartOpen)
  }

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon'></ShoppingIcon>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon