import React, { useContext } from 'react'
import { CategoriesContext } from '../../context/categories.component'
import CategoryPreview from '../../components/category-preview/category-preview.component'

const CategoriesPreview = () => {

  const categoriesData = useContext(CategoriesContext)
  const { categoriesMap } = categoriesData

  return (
    <>
      {
        Object.keys(categoriesMap).map(title => {
          const products = categoriesMap[title]

          return (
            <CategoryPreview key={title} products={products} title={title}></CategoryPreview>
          )
        })
      }
    </>
  )
}

export default CategoriesPreview