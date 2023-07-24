import React, { useContext } from 'react'
// import { CategoriesContext } from '../../context/categories.component'
import CategoryPreview from '../../components/category-preview/category-preview.component'
import { useSelector } from 'react-redux'
import { getCategoriesMap } from '../../store/categories/category.selector'

const CategoriesPreview = () => {

  // const categoriesData = useContext(CategoriesContext)
  // const { categoriesMap } = categoriesData
  const categoriesMap = useSelector(getCategoriesMap)

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