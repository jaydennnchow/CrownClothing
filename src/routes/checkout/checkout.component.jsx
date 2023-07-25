import React, { useContext } from 'react'
import './checkout.styles.scss'
// import { CartContext } from '../../context/cart.component'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import {useSelector} from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector'

const Checkout = () => {

    // const { cartItems, cartTotal } = useContext(CartContext)
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {/* checkout item */}
            {
                cartItems.map(item => <CheckoutItem key={item.id} product={item}></CheckoutItem>)
            }
            <span className='total'>Total: ${cartTotal}</span>
        </div>
    )
}

export default Checkout