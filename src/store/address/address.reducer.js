import { ADDRESS_ACTION_TYPES } from "./address.types"



export const ADDRESS_INITIAL_STATE = {
    addressMap: {},
    isLoading: false,
    error: null
}

export const addressReducer = (state=ADDRESS_INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case ADDRESS_ACTION_TYPES.FETCH_ADDRESS_START:
            return {
                ...state,
                isLoading: true
            }
        case ADDRESS_ACTION_TYPES.FETCH_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addressMap: payload
            }
        case ADDRESS_ACTION_TYPES.FETCH_ADDRESS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case ADDRESS_ACTION_TYPES.ADD_ADDRESS_START:
            return {
                ...state,
                isLoading: true
            }
        // case ADDRESS_ACTION_TYPES.ADD_ADDRESS_SUCCESS:
        //     return {
        //         ...state,
        //         isLoading: false,
        //     }
        case ADDRESS_ACTION_TYPES.ADD_ADDRESS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case ADDRESS_ACTION_TYPES.DELETE_ADDRESS_START:
            return {
                ...state,
                isLoading: true
            }
        case ADDRESS_ACTION_TYPES.DELETE_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case ADDRESS_ACTION_TYPES.DELETE_ADDRESS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
}