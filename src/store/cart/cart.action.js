import { ACTION_TYPE } from "./cart.types"

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id)
    if (existingCartItem) {
        const newCartItems = cartItems.map(item => {
            if (item.id === productToAdd.id) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item
        })
        return newCartItems
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, product) => {
    if (product.quantity === 1) {
        const newCartItems = cartItems.filter(item => item.id !== product.id)
        return newCartItems
    }
    const newCartItems = cartItems.map(item => {
        if (item.id === product.id) {
            return { ...product, quantity: product.quantity - 1 }
        }
        return item
    })
    return newCartItems
}

const clearCartItem = (cartItems, product) => cartItems.filter(item => item.id !== product.id)




export const setIsCartOpen = newIsCartOpen => {
    return { type: ACTION_TYPE.SET_IS_CART_OPEN, payload: newIsCartOpen }
}

// 添加商品到购物车
export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return { type: ACTION_TYPE.SET_CART_ITEMS, payload: newCartItems }
}

// 从购物车减少(移除)商品
export const removeItemFromCart = (cartItems, product) => {
    const newCartItems = removeCartItem(cartItems, product)
    return { type: ACTION_TYPE.SET_CART_ITEMS, payload: newCartItems }
}

// 一键移除指定商品
export const clearItemFormCart = (cartItems, product) => {
    const newCartItems = clearCartItem(cartItems, product)
    return { type: ACTION_TYPE.SET_CART_ITEMS, payload: newCartItems }
}