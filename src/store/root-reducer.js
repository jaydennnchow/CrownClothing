import { combineReducers } from 'redux'
import { userReducer } from './user/user.reducer'
import { categoriesReducer } from './categories/category.reducer'
import { cartReducer } from './cart/cart.reducer'
import { addressReducer } from './address/address.reducer'




export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    address: addressReducer
})