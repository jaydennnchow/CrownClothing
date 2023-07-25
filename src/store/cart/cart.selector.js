import { createSelector } from 'reselect'


const selectCartReducer = state => state.cart

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cartReducer) => cartReducer.isCartOpen
)

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cartReducer) => cartReducer.cartItems
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems)=>{
        return cartItems.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.quantity
        }, 0)
    }
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => {
        return cartItems.reduce((prev, curr) => {
            return prev + curr.price * curr.quantity
        }, 0)
    }
)