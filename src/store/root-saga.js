import { all, call } from 'redux-saga/effects'
import { categoriesSaga } from './categories/category.saga'
import { userSaga } from './user/user.saga'
import { addressSaga } from './address/address.saga'
import { cartSaga } from './cart/cart.saga'


export function* rootSaga() {
    yield all([
        call(categoriesSaga), 
        call(userSaga),
        call(addressSaga),
        call(cartSaga)
    ])
}