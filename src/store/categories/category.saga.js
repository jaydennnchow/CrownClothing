import { takeLatest, all, call, put } from 'redux-saga/effects'
import { getCategoriesAndDocuments2 } from '../../routes/utils/firebase.utils'
import { fetchCategoriesFailed, fetchCategoriesSuccess } from './category.action'
import { CATEGORIES_ACTION_TYPES } from './category.types'


export function* fetchCategoriesAsyc() {
    /**
     * 在 generator function 中，不能用 async await，只能用 yield 代替
     * 
     * call() : 创建一个 函数调用 的 Effect, 可以在 Saga 中对该 Effect 进行进一步处理，例如捕获错误、中断调用
     * 
     * 2 arguments:  1. 要调用的函数   2. 传递给函数的 参数列表( 参数1, 参数2, 参数3, ... )
     * 
     * put() : 相当于原来的 dispatch，可以看作是 generator function 的 dispatch
     */
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments2)
        yield put(fetchCategoriesSuccess(categoriesArray))
    } catch (error) {
        yield put(fetchCategoriesFailed(error))
        console.log(error);
    }
}

export function* onFetchCategories() {
    /**
     * takeLatest() : 处理多次连续触发的相同类型的动作，保证只执行最后一次触发的动作，忽略之前的触发
     * 
     * 2 arguments:  1. action type( 同 reducer 里面的 type )；   2. 当前 action type 要执行的 函数
     */
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,fetchCategoriesAsyc)
}


export function* categoriesSaga() {
    /**
     * all() : run everything inside and only complete when all of it is done
     * 
     * arguments: 一个数组，数组元素：Effect
     * 
     * 使用目的：在执行多个并行的saga任务时，等待它们全部完成后再执行下一步操作
     *         这可以用于处理一组相关的异步操作，保证它们都成功完成后再进行后续逻辑
     * 
     * e.g. 两个异步操作的saga任务A和B，就可以使用 all([A, B]) 来创建一个新的saga任务，
     *      它会等待A和B都完成后再继续执行下一步
     */
    yield all([call(onFetchCategories)])
}