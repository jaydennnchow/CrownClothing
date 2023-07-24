// all states should be stored in one place which is the Redux store
import {compose,createStore,applyMiddleware} from 'redux'
/**
 * Logger allows us to see what the state looks like before an action is dispatched, what the action is,
 * and then how the state looks after the action
 */
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'



// whenever you dispatch an action, before that action hits the reducers,
// it hits the middleware first
const middleWares = [logger]

const composeEnhancers = compose(applyMiddleware(...middleWares))

/**
 * 3 arguments: rootReducer, store 的 初始状态, 增强Redux store功能的函数
 */
export const store = createStore(rootReducer,undefined,composeEnhancers)