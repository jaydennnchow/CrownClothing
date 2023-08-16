import { ADDRESS_ACTION_TYPES } from "./address.types"

export const fetchAddressStart = (addressConfig) => {
    return { type: ADDRESS_ACTION_TYPES.FETCH_ADDRESS_START, payload: addressConfig }
}
export const fetchAddressSuccess = (addressMap) => {
    return { type: ADDRESS_ACTION_TYPES.FETCH_ADDRESS_SUCCESS, payload: addressMap }
}
export const fetchAddressFailed = (error) => {
    return { type: ADDRESS_ACTION_TYPES.FETCH_ADDRESS_FAILED, payload: error }
}


export const addAddressStart = (addressInformation, oldAddressMap) => {
    return { type: ADDRESS_ACTION_TYPES.ADD_ADDRESS_START, payload: { addressInformation, oldAddressMap } }
}

export const addAddressSuccess = (userId) => {
    return { type: ADDRESS_ACTION_TYPES.ADD_ADDRESS_SUCCESS, payload: userId }
}

export const addAddressFailed = (error) => {
    return { type: ADDRESS_ACTION_TYPES.ADD_ADDRESS_FAILED, payload: error }
}