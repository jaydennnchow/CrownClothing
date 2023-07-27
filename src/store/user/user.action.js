import { USER_ACTION_TYPES } from "../../store/user/user.types"

export const setCurrentUser = user => {
    return { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user }
}

export const checkUserSession = () => {
    return { type: USER_ACTION_TYPES.CHECK_USER_SESSION }
}

export const googleSiginInStart = () => {
    return { type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START }
}

export const emailSiginInStart = (email, password) => {
    return { type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START, payload: { email, password } }
}

export const siginInSuccess = (user) => {
    return { type: USER_ACTION_TYPES.SIGN_IN_SUCCESS, payload: user }
}

export const siginInFailed = (error) => {
    return { type: USER_ACTION_TYPES.SIGN_IN_FAILED, payload: error }
}

export const signUpStart = (email, password, displayName) => {
    return { type: USER_ACTION_TYPES.SIGN_UP_START, payload: { email, password, displayName } }
}

export const siginUpSuccess = (user, additionalInformation) => {
    return { type: USER_ACTION_TYPES.SIGN_UP_SUCCESS, payload: { user, additionalInformation } }
}

export const siginUpFailed = (error) => {
    return { type: USER_ACTION_TYPES.SIGN_UP_FAILED, payload: { error } }
}

export const signOutStart = () => {
    return { type: USER_ACTION_TYPES.SIGN_OUT_START }
}

export const signOutSuccess = () => {
    return { type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS }
}

export const signOutFailed = (error) => {
    return { type: USER_ACTION_TYPES.SIGN_OUT_FAILED, payload: error }
}