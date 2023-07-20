import React, { useContext } from 'react'
import './checkout-item.styles.scss'
import { CartContext } from '../../context/cart.component'

const CheckoutItem = ({ product }) => {

    const { name, price, quantity, imageUrl } = product
    const { addItemToCart, removeItemFromCart, clearItemFormCart } = useContext(CartContext)

    const increaseProduct = (product) => {
        addItemToCart(product)
    }

    const decreaseProduct = (product) => {
        removeItemFromCart(product)
    }

    const clearProduct = (product) => {
        clearItemFormCart(product)
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