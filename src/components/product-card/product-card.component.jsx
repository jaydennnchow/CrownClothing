import React, { useContext } from 'react'
import './product-card.styles.scss'
import Button from '../button/button.component'
import { CartContext } from '../../context/cart.component'

const ProductCard = ({product}) => {

    const {name,imageUrl,price} = product
    const {addItemToCart} = useContext(CartContext)

    const addProductToCart = (product) => addItemToCart(product)
    
  return (
    <div className='product-card-container'>
        <img src={imageUrl} alt={name}></img>
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <Button buttonType='inverted' onClick={()=>addProductToCart(product)}>Add to cart</Button>
    </div>
  )
}

export default ProductCard