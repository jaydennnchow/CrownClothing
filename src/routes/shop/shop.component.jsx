import React, { } from 'react'
import { Route, Routes } from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'

const Shop = () => {

  /**
   * 路由 多级嵌套：
   *    只要是 "/shop/"，都会渲染 此组件
   *    然后，组件再根据 路由的具体路径，渲染不同的组件
   */

  return (
    <Routes>
      <Route index element={<CategoriesPreview></CategoriesPreview>}></Route>
      <Route path=':category' element={<Category></Category>}></Route>
    </Routes>
  )
}

export default Shop