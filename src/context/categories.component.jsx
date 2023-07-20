import React, { createContext, useEffect, useState } from 'react'
import SHOP_DATA from '../shop-data'
import { getCategoriesAndDocuments, getCategoriesAndDocuments2 } from '../routes/utils/firebase.utils'

export const CategoriesContext = createContext({
    categoriesMap: [],
})

export const CategoriesProvider = (props) => {

    const [categoriesMap, setCategoriesMap] = useState([])
    const value = { categoriesMap, setCategoriesMap }

    // useEffect(()=>{
    //     addCollectionAndDocuments('categories',SHOP_DATA)
    // },[])

    useEffect(()=>{
        const getCategoriesMap = async () => {
            // const categoriesMap = await getCategoriesAndDocuments()
            const categoriesMap = await getCategoriesAndDocuments2()
            setCategoriesMap(categoriesMap)
        }
        getCategoriesMap()
    },[])


    return (
        <CategoriesContext.Provider value={value}>
            {props.children}
        </CategoriesContext.Provider>
    )
}
