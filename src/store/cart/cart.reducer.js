import { CART_ACTION_TYPE } from "./cart.types"

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    isLoading: false,
    error: null
}

export const cartReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTION_TYPE.SET_CART_ITEMS_START:
            return {
                ...state,
                isLoading: true
            }
        case CART_ACTION_TYPE.SET_CART_ITEMS_FAILED:
            return {
                ...state,
                isLoading:false,
                error: payload
            }
        case CART_ACTION_TYPE.FETCH_CART_ITEMS_START:
            return {
                ...state,
                isLoading: true
            }
        case CART_ACTION_TYPE.FETCH_CART_ITEMS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cartItems: payload
            }
        case CART_ACTION_TYPE.FETCH_CART_ITEMS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case CART_ACTION_TYPE.SIGN_OUT_CART_ITEMS:
            return {
                ...state,
                ...INITIAL_STATE
            }
        default:
            return state
    }
}