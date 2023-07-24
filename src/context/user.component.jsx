import { createContext, useEffect, useReducer, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../routes/utils/firebase.utils";


export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`unhandled type ${type} in userReducer`)
    }
}


// as the actual value you want to access
// initial the context
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

// a functional component
export const UserProvider = (props) => {
    // const [currentUser, setCurrentUser] = useState(null)
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)
    const setCurrentUser = user => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
    }
    const { currentUser } = state
    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        /**
         * 传给 onAuthStateChanged() 的 callback 的 参数：
         *     表示 当前用户的身份验证状态（即：const response = await signInWithGooglePopup()，response里面的user）
         *     有 2 种情况：
         *          1. 用户已经登录，则表示当前已登录用户的用户对象
         *          2. 未登录/已经登出，则为 null
         *     返回值：返回一个 unsubscribe函数，在useEffect中的return中调用，用于 清除用户身份验证状态的监听器
         */
        const unsubscribe = onAuthStateChangedListener(async user => {
            if (user) {
                await createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })

        return () => unsubscribe()
    }, [])

    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
}