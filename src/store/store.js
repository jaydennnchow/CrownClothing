// all states should be stored in one place which is the Redux store
import { compose, createStore, applyMiddleware } from 'redux'
/**
 * Logger allows us to see what the state looks like before an action is dispatched, what the action is,
 * and then how the state looks after the action
 */
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
// redux 持久化
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


// 1. 配置 持久化对象
const persistConfig = {
    key: 'root',   // 在localStorge中生成key为root的值
    storage,
    blacklist: ['user']     //设置某个 reducer 数据不持久化，
}

// 2. 生成一个 persistReducer
// 2 arguments: 1. 持久化配置对象； 2. rootReducer
const myPersistReducer = persistReducer(persistConfig,rootReducer)

// whenever you dispatch an action, before that action hits the reducers,
// it hits the middleware first
const middleWares = [logger]

const composeEnhancers = compose(applyMiddleware(...middleWares))

/**
 * 3 arguments: rootReducer, store 的 初始状态, 增强Redux store功能的函数
 */
// 3. 将 createStore 的第一个参数 改为 persistReducer
export const store = createStore(myPersistReducer, undefined, composeEnhancers)

// 4. 向外导出一个 persistor对象，用在 项目的入口文件 index.js
export const persistor = persistStore(store)

// 5. 在入口文件 index.js 用 <PersistGate /> 包裹整个 <App />组件，并提供 persistor属性，值为 第四步导出的 persistor对象