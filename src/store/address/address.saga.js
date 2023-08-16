import { takeLatest, all, call, put } from 'redux-saga/effects'
import { ADDRESS_ACTION_TYPES } from './address.types'
import { createUserAddress, getUserAddress } from '../../routes/utils/firebase.utils'
import { addAddressFailed, addAddressSuccess, fetchAddressFailed, fetchAddressStart, fetchAddressSuccess } from './address.action'



// ---------------- Get Address Start ----------------
export function* getAddress(action) {

    const { payload } = action
    const userId = payload.userId
    const addressId = payload.addressId

    try {
        const addressMap = yield call(getUserAddress, userId, addressId)
        console.log(addressMap);
        yield put(fetchAddressSuccess(addressMap))
    } catch (error) {
        yield put(fetchAddressFailed(error))
    }
}

export function* onFetchAddress() {
    yield takeLatest(ADDRESS_ACTION_TYPES.FETCH_ADDRESS_START, getAddress)
}
// ---------------- Get Address End ----------------


// ---------------- Add Address Start ----------------
export function* fetchAddressAfterAdding(action) {
    const { payload } = action
    const userId = payload

    yield put(fetchAddressStart({ userId }))
}

export function* onAddAddressSuccess() {
    yield takeLatest(ADDRESS_ACTION_TYPES.ADD_ADDRESS_SUCCESS, fetchAddressAfterAdding)
}

export function* addAddress(action) {
    const { payload } = action
    const { addressInformation, oldAddressMap } = payload
    // console.log(addressInformation);
    const { userId, consignee, province, city, street } = addressInformation

    try {
        const addressSnapshot = yield call(createUserAddress, userId, consignee, province, city, street, oldAddressMap)
        // console.log(addressSnapshot);
        yield put(addAddressSuccess(userId))
    } catch (error) {
        yield put(addAddressFailed(error))
    }
}

export function* onAddAddress() {
    yield takeLatest(ADDRESS_ACTION_TYPES.ADD_ADDRESS_START, addAddress)
}
// ---------------- Add Address End ----------------






export function* addressSaga() {
    yield all([
        call(onFetchAddress),
        call(onAddAddress),
        call(onAddAddressSuccess)
    ])
}