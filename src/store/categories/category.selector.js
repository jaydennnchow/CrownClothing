// the selector file is where this reducer specific transformation business logic is going to live(转换数据格式)

import {createSelector} from 'reselect'


/**
 * Reselect 的主要目的：
 *      当 rootStore 中存储的任意 state 发生变化时，
 *      所有用了 useSelector 访问其中的 state 的组件都会 重新执行 selector 里面的 logic
 *      如果 selector 的计算成本很高 或 selector 依赖的数据不发生变化，则这种 重新执行 可能会导致性能问题
 * 
 * Reselect 的优势：
 *      会 自动缓存 先前的结果
 *      当 输入selector 的数据未发生变化时，Reselect 会返回先前缓存的结果，而不重新计算
 * 
 * createSelector 接收 2个 参数： 1. 输入 selector(1个 或 多个)； 2. 输出结果
 *                                 数组形式                       函数形式，return 的值 就是 输出结果
 * 
 * createSelector 的执行过程：
 *      当 rootStore 里面的任意 state 发生改变时，所有用了 useSelector 访问其中的 state 的组件都会 重新执行 selector 里面的 logic
 *      1. 判断 第一个参数 categories 的值 是否发生了变化
 *      2. 是，执行 第二个参数 函数里面的 logic，return 最新的结果
 *      3. 否，直接 return 上一次的结果，不执行 第二个参数 函数里面的 logic
 */

const categories = state => {
    return state.categories.categories
}

// 将 categoriesArray 转换成 categoriesMap
export const getCategories = createSelector(
    // 输入选择器，即：categoryReducer 里面的 categories
    [categories],
    // 将 categories 作为 函数的参数，在函数里面 return 输出结果
    (categories)=>{
        const categoryMap = {}
        categories.forEach(category => {
            const {title,items} = category
            categoryMap[title.toLowerCase()] = items
        });
        return categoryMap
    }
)