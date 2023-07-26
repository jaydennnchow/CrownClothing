import { CATEGORIES_ACTION_TYPES } from "./category.types"

// 使用 redux-thunk
export const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null
}

// the reducer always store the most basic format which is the data you get from your API(拿到数据直接存，不转换格式)
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true
            }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload,
                isLoading: false
            }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        default:
            return state
    }
}