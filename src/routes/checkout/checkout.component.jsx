import React, { useContext } from 'react'
import './checkout.styles.scss'
// import { CartContext } from '../../context/cart.component'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector'
import PaymentForm from '../../components/payment-form/payment-form.component'
import Address from '../address/address.component'

const Checkout = () => {

    // const { cartItems, cartTotal } = useContext(CartContext)
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)

    const getCheckBoxIsChecked = (isChecked) => {
        if(isChecked){
            console.log(isChecked);
        }
    }

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

            {/* Address */}
            {/* <Address></Address> */}
            {
                cartItems.length > 0 && (
                    <>
                        <Address isOnCheckOut={true} getCheckBoxIsChecked={getCheckBoxIsChecked}></Address>
                        <PaymentForm></PaymentForm>
                    </>
                )
            }

        </div>
    )
}

export default Checkout