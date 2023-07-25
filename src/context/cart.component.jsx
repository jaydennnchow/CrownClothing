import { createContext, useEffect, useReducer, useState } from "react";


const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id)
    if (existingCartItem) {
        /**
         * 在map函数中，需要返回更新后的对象，
         * 因为map函数会遍历原始数组的每个元素，并根据回调函数的返回值创建一个新的数组。
         * 如果不返回更新后的对象，map函数会将原始数组中的元素保持不变，导致新的数组中的元素仍然是原始的item对象，没有正确地更新购物车中商品的数量。
         * 因此，需要使用return { ...item, quantity: item.quantity + 1 }语句返回更新后的item对象，确保新的数组中的元素是更新后的对象。
         */
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

const removeCartItem = (product, cartItems) => {
    if (product.quantity === 1) {
        const newCartItems = cartItems.filter(item => item.id !== product.id)
        // console.log('过滤后的数据：',newCartItems);
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

const clearCartItem = (product, cartItems) => cartItems.filter(item => item.id !== product.id)


const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const ACTION_TYPE = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

// reducer doesn't contain any business logics, just modify the state
const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case ACTION_TYPE.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeCartItem: () => { },
    clearCartItem: () => { },
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = (props) => {

    // 购物车 是否打开
    // const [isCartOpen, setIsCartOpen] = useState(false)
    // 购物车
    // const [cartItems, setCartItems] = useState([])
    // 购物车 数量
    // const [cartCount, setCartCount] = useState(0)
    // 购物车 总金额
    // const [cartTotal, setCartTotal] = useState(0)

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const { cartItems, cartCount, cartTotal, isCartOpen } = state

    const updateCartItems = newCartItems => {
        // generate newCartCount
        const newCartCount = newCartItems.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.quantity
        }, 0)

        // generate newCartTotal
        const newCartTotal = newCartItems.reduce((prev, curr) => {
            return prev + curr.price * curr.quantity
        }, 0)

        // modify the state
        dispatch({ type: ACTION_TYPE.SET_CART_ITEMS, payload: { cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal } })
    }

    const setIsCartOpen = newIsCartOpen => {
        dispatch({ type: ACTION_TYPE.SET_IS_CART_OPEN, payload: newIsCartOpen })
    }


    // 添加商品到购物车
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItems(newCartItems)
    }

    // 从购物车减少(移除)商品
    const removeItemFromCart = (product) => {
        const newCartItems = removeCartItem(product, cartItems)
        updateCartItems(newCartItems)
    }

    // 一键移除指定商品
    const clearItemFormCart = (product) => {
        const newCartItems = clearCartItem(product, cartItems)
        updateCartItems(newCartItems)
    }

    // 只要购物车的商品发生了变化，购物车的总数量都会发生变化 (无论是新加入，还是原来已有，现在增加数量)
    // useEffect(() => {
    //     const totalCount = cartItems.reduce((previousValue, currentValue) => {
    //         return previousValue + currentValue.quantity
    //     }, 0)
    //     setCartCount(totalCount)
    // }, [cartItems])

    // 同理，监控购物车的总金额
    // useEffect(() => {
    //     const total = cartItems.reduce((prev, curr) => {
    //         return prev + curr.price * curr.quantity
    //     }, 0)
    //     setCartTotal(total)
    // }, [cartItems])

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFormCart,
        cartCount,
        cartTotal
    }

    return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
}