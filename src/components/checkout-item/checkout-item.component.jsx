import React, { useContext } from 'react'
import './checkout-item.styles.scss'
// import { CartContext } from '../../context/cart.component'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, clearItemFormCart, removeItemFromCart, setCartStart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'
import { getCurrentUser } from '../../store/user/user.selector'

const CheckoutItem = ({ product }) => {

    const dispatch = useDispatch()

    const { name, price, quantity, imageUrl } = product
    // const { addItemToCart, removeItemFromCart, clearItemFormCart } = useContext(CartContext)
    const cartItems = useSelector(selectCartItems)
    const currentUser = useSelector(getCurrentUser)

    const increaseProduct = (product) => {
        dispatch(setCartStart(currentUser.id, cartItems, product, 'increase'))
    }

    const decreaseProduct = (product) => {
        dispatch(setCartStart(currentUser.id, cartItems, product, 'decrease'))
    }

    const clearProduct = (product) => {
        dispatch(setCartStart(currentUser.id, cartItems, product, 'clear'))
    }

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}></img>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <span className='arrow' onClick={() => decreaseProduct(product)}>&#10094;</span>
                <span className='value'>{quantity}</span>
                <span className='arrow' onClick={() => increaseProduct(product)}>&#10095;</span>
            </span>
            <span className='price'>{price}</span>
            <span className='remove-button' onClick={() => clearProduct(product)}>&#10005;</span>
        </div>
    )
}

export default CheckoutItem