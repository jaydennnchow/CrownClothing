import React, { useContext, useEffect, useState } from 'react'
import './category.styles.scss'
import { useParams } from 'react-router-dom'
import { CategoriesContext } from '../../context/categories.component'
import ProductCard from '../../components/product-card/product-card.component'

const Category = () => {

    const params = useParams()
    const {category} = params

    const {categoriesMap} = useContext(CategoriesContext)

    const [products,setProducts] = useState([])
    // 只有当 category 和 categoriesMap 发生改变时，才重新获取 products (性能优化)
    // 如果不用 useEffect，组件每次重新渲染 都会获取 products
    useEffect(()=>{
        setProducts(categoriesMap[category])
    },[category,categoriesMap])

  return (
    <>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className='category-container'>
        {
            /**
             * If you have components that rely on asyncronously fetched code,
             * you will need to put in some kind of safe guard
             * so that you only render your component if the actual data is present.
             * 
             * 
             * 由于 products 是从 categoriesMap 获取的，而 categoriesMap 是通过 异步请求 获取的，
             * 因此，当本组件 首次渲染 时，categoriesMap 还没获取到，
             * 所以，需要 “建立保护措施” 来保证 products.map() 不会出现 products 是 undefined 的情况
             * 
             * “建立保护措施”：1. &&短路；2. 三元运算符
             */
            products && products.map(item => <ProductCard key={item.id} product={item}></ProductCard>)
            // products ? products.map(item => <ProductCard key={item.id} product={item}></ProductCard>):null
        }
    </div>
    </>
    
  )
}

export default Category