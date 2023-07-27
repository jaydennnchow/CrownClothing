import { getCategoriesAndDocuments2 } from "../../routes/utils/firebase.utils"
import { CATEGORIES_ACTION_TYPES } from "./category.types"



/**
 * 通常情况下，Redux中的 action 应该是 return 一个对象，
 * 但是使用 redux-thunk 中间件后，就可以让 action return 一个函数，而不是一个对象
 * 
 * 使用 redux-thunk，可以在 action 创建函数中执行异步操作，例如发送网络请求或者延迟操作
 * 
 * redux-thunk 的工作原理：
 *      1. 检查action是否为函数类型
 *      2. 是，则会调用该函数并传入 dispatch 和 getState 作为参数，
 *         这样，我们就可以在函数内部执行异步操作，并根据异步操作的结果来分发其他的 action
 * 
 * redux-thunk 的使用目的：
 *      1. 使用 redux 统一管理所有的 side effect，如：异步请求
 *      2. 组件内部不再需要 维护 各种 side effect
 *      3. 更好地管理应用程序的 state 和 side effect，使代码更具可测试性和可维护性
 */

// export const setCategories = (categoriesArray) => {
//     return {type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,payload:categoriesArray}
// }

export const fetchCategoriesStart = () => {
    return {type:CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,payload:null}
}

export const fetchCategoriesSuccess = (categoriesArray) => {
    return {type:CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,payload:categoriesArray}
}

export const fetchCategoriesFailed = (error) => {
    return {type:CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,payload:error}
}

// 使用 redux-thunk 声明的 action，名字最后最好以 Async 结尾
export const fetchCategoriesAsyc = () => {
    return async (dispatch) => {
        dispatch(fetchCategoriesStart)
        try {
            const categoriesArray = await getCategoriesAndDocuments2()
            dispatch(fetchCategoriesSuccess(categoriesArray))
        } catch (error) {
            dispatch(fetchCategoriesFailed(error))
            console.log(error);
        }
    }
}