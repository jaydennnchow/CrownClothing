import React, { useContext } from 'react'
// import { CategoriesContext } from '../../context/categories.component'
import CategoryPreview from '../../components/category-preview/category-preview.component'
import { useSelector } from 'react-redux'
import { getCategories, selectIsLoading } from '../../store/categories/category.selector'
import Spinner from '../../components/spinner/spinner.component'

const CategoriesPreview = () => {

  // const categoriesData = useContext(CategoriesContext)
  // const { categoriesMap } = categoriesData
  const categoriesMap = useSelector(getCategories)
  const isLoading = useSelector(selectIsLoading)

  return (
    <>
      {
        isLoading ? <Spinner /> :
          (Object.keys(categoriesMap).map(title => {
            const products = categoriesMap[title]

            return (
              <CategoryPreview key={title} products={products} title={title}></CategoryPreview>
            )
          }))
      }
    </>
  )
}

export default CategoriesPreview