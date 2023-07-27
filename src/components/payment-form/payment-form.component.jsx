import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { FormContainer, PaymentButton, PaymentFormContainer } from './payment-form.styles'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../store/user/user.selector'
import { selectCartTotal } from '../../store/cart/cart.selector'

const PaymentForm = () => {

    const currentUser = useSelector(getCurrentUser)
    const amount = useSelector(selectCartTotal)

    const [isProcessingPayment,setIsProcessingPayment] = useState(false)

    // stripe 执行与 Stripe API 的交互,如：创建支付方法 或 确认付款意图
    const stripe = useStripe()
    // elements 可以获得 Stripe元素实例
    const elements = useElements()

    const paymentHandler = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            // stripe 或 elements对象 未正确初始化
            return
        }

        setIsProcessingPayment(true)

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json())

        // console.log(response);

        const clientSecret = response.paymentIntent.client_secret

        // create payment
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest'
                }
            }
        })

        setIsProcessingPayment(false)

        if (paymentResult.error) {
            alert(paymentResult.error)
        } else {
            alert('Payment Successful')
        }
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement></CardElement>
                <PaymentButton buttonType='inverted' type='submit' isLoading={isProcessingPayment}> Pay now </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm