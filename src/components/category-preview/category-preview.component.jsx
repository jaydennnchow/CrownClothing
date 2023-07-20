import React from 'react'
import './category-preview.styles.scss'
import ProductCard from '../product-card/product-card.component'
import { Link } from 'react-router-dom'

const CategoryPreview = ({title,products}) => {
  return (
    <div className='category-preview-container'>
        {/* <h2>
            <Link className='title' to={title}>{title.toUpperCase()}</Link>
        </h2> */}
        <Link className='title' to={title}>{title.toUpperCase()}</Link>
        <div className="preview">
            {
                products.filter((item,index) => {return index <= 3})
                .map(product => <ProductCard key={product.id} product={product}></ProductCard>)
            }
        </div>
    </div>
  )
}

export default CategoryPreview