import { takeLatest, all, call, put } from 'redux-saga/effects'
import { CART_ACTION_TYPE } from './cart.types'
import { getUserCart, setUserCart } from '../../routes/utils/firebase.utils'
import { addItemToCart, clearItemFormCart, clearItemFromCartAfterPayment, fetchCartFailed, fetchCartStart, fetchCartSuccess, removeItemFromCart, setCartFailed, setCartSuccess } from './cart.action'




// ---------------- Get Cart Start ----------------
export function* getCart(action) {
    const { payload } = action
    const userId = payload

    try {
        const cart = yield call(getUserCart, userId)
        yield put(fetchCartSuccess(cart))
    } catch (error) {
        yield put(fetchCartFailed(error))
    }
}

export function* onFetchCart() {
    yield takeLatest(CART_ACTION_TYPE.FETCH_CART_ITEMS_START, getCart)
}
// ---------------- Get Cart End ----------------


// ---------------- Set Cart Start(增加、删除、一键删除合埋一起处理) ----------------
export function* fetchCartAfterSettling(action) {
    const { payload } = action
    const userId = payload

    yield put(fetchCartStart(userId))
}

export function* onSettleCartSuccess() {
    yield takeLatest(CART_ACTION_TYPE.SET_CART_ITEMS_SUCCESS, fetchCartAfterSettling)
}

export function* settle(action) {
    const { payload } = action
    const { userId, newCartItems } = payload

    try {
        yield call(setUserCart, userId, newCartItems)
        yield put(setCartSuccess(userId))
    } catch (error) {
        yield put(setCartFailed(error))
    }
}

export function* onAdd() {
    yield takeLatest(CART_ACTION_TYPE.ADD_CART_ITEMS, settle)
}

export function* onRemove() {
    yield takeLatest(CART_ACTION_TYPE.REMOVE_CART_ITEMS, settle)
}

export function* onClear() {
    yield takeLatest(CART_ACTION_TYPE.CLEAR_CART_ITEMS, settle)
}

export function* onClearAfterPayment() {
    yield takeLatest(CART_ACTION_TYPE.CLEAR_CART_ITEMS_AFTER_PAYMENT, settle)
}

export function* setCart(action) {
    const { payload } = action
    const { userId, cartItems, product, operation } = payload
    console.log(operation);
    if (operation === 'increase') {
        yield put(addItemToCart(userId, cartItems, product))
    } else if (operation === 'decrease') {
        yield put(removeItemFromCart(userId, cartItems, product))
    } else if (operation === 'clear') {
        yield put(clearItemFormCart(userId, cartItems, product))
    } else if (operation === 'clearAfterPayment') {
        yield put(clearItemFromCartAfterPayment(userId))
    }
}

export function* onSetCart() {
    yield takeLatest(CART_ACTION_TYPE.SET_CART_ITEMS_START, setCart)
}
// ---------------- Set Cart End ----------------



export function* cartSaga() {
    yield all([
        call(onFetchCart),
        call(onSetCart),
        call(onAdd),
        call(onRemove),
        call(onClear),
        call(onSettleCartSuccess)
    ])
}