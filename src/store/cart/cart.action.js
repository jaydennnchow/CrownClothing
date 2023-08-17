import { CART_ACTION_TYPE } from "./cart.types"

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
    return { type: CART_ACTION_TYPE.SET_IS_CART_OPEN, payload: newIsCartOpen }
}

export const fetchCartStart = userId => {
    return { type: CART_ACTION_TYPE.FETCH_CART_ITEMS_START, payload: userId }
}

export const fetchCartSuccess = cartItems => {
    return { type: CART_ACTION_TYPE.FETCH_CART_ITEMS_SUCCESS, payload: cartItems }
}

export const fetchCartFailed = error => {
    return { type: CART_ACTION_TYPE.FETCH_CART_ITEMS_FAILED, payload: error }
}

export const setCartStart = (userId, cartItems, product, operation) => {
    return { type: CART_ACTION_TYPE.SET_CART_ITEMS_START, payload: { userId, cartItems, product, operation } }
}

export const setCartSuccess = (userId) => {
    return { type: CART_ACTION_TYPE.SET_CART_ITEMS_SUCCESS, payload: userId }
}

export const setCartFailed = (error) => {
    return { type: CART_ACTION_TYPE.SET_CART_ITEMS_FAILED, payload: error }
}

// 添加商品到购物车
export const addItemToCart = (userId, cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return { type: CART_ACTION_TYPE.ADD_CART_ITEMS, payload: { userId, newCartItems } }
}

// 从购物车减少(移除)商品
export const removeItemFromCart = (userId, cartItems, product) => {
    const newCartItems = removeCartItem(cartItems, product)
    return { type: CART_ACTION_TYPE.REMOVE_CART_ITEMS, payload: { userId, newCartItems } }
}

// 一键移除指定商品
export const clearItemFormCart = (userId, cartItems, product) => {
    const newCartItems = clearCartItem(cartItems, product)
    return { type: CART_ACTION_TYPE.CLEAR_CART_ITEMS, payload: { userId, newCartItems } }
}

export const signOutCart = () => {
    return { type: CART_ACTION_TYPE.SIGN_OUT_CART_ITEMS }
}