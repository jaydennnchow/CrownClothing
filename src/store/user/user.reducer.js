import { USER_ACTION_TYPES } from "./user.types"

const INITIAL_STATE = {
    currentUser: null
}

// 创建时，要给 state 添加默认值
// 相当于 useReducer( reducer, initial_state )
export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state
    }
}

