import { takeLatest, all, call, put } from 'redux-saga/effects'
import { USER_ACTION_TYPES } from './user.types'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signOutUser } from '../../routes/utils/firebase.utils'
import { emailSiginInStart, siginInFailed, siginInSuccess, siginUpFailed, siginUpSuccess, signOutFailed, signOutSuccess } from './user.action'
import { signOutCart } from '../cart/cart.action'


export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
    try {
        const userSnapShot = yield call(createUserDocumentFromAuth, userAuth, additionalInformation)
        // console.log(userSnapShot);
        // console.log(userSnapShot.data());
        yield put(siginInSuccess({ id: userSnapShot.id, ...userSnapShot.data(), accessToken: userAuth.accessToken }))
    } catch (error) {
        yield put(siginInFailed(error))
    }
}

export function* isUserAuthenicated() {
    try {
        const userAuth = yield call(getCurrentUser)
        if (!userAuth) return;   // not sign in
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield put(siginInFailed(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenicated)
}

export function* siginInWithGoogle() {
    try {
        const response = yield call(signInWithGooglePopup)
        yield call(getSnapshotFromUserAuth, response.user)
    } catch (error) {
        yield put(siginInFailed(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, siginInWithGoogle)
}

export function* siginInWithEamil(action) {
    // 每个函数都 默认 接收一个 action 参数，相当与 reducer 中的 action
    const { payload } = action
    const email = payload.email
    const password = payload.password

    try {
        const response = yield call(signInAuthUserWithEmailAndPassword, email, password)
        yield call(getSnapshotFromUserAuth, response.user)
    } catch (error) {
        switch (error.code) {
            case 'auth/user-not-found':
                alert('no user associated with this email')
                break
            case 'auth/wrong-password':
                alert('incorrect password for email')
                break
            default:
                alert(error)
                console.log(error);
        }
        yield put(siginInFailed(error))
    }
}

export function* onEmailSignin() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, siginInWithEamil)
}

export function* signUp(action) {
    const { payload } = action
    const { email, password, displayName } = payload
    try {
        const response = yield call(createAuthUserWithEmailAndPassword, email, password)
        yield put(siginUpSuccess(response.user, { displayName }))
    } catch (error) {
        yield put(siginUpFailed(error))
    }
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* siginInAfterSignUp(action) {
    const { payload } = action
    const { user, additionalInformation } = payload
    yield call(getSnapshotFromUserAuth, user, additionalInformation)
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, siginInAfterSignUp)
}

export function* signOut() {
    try {
        yield call(signOutUser)
        yield put(signOutSuccess())
        yield put(signOutCart())
    } catch (error) {
        yield put(signOutFailed(error))
    }
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignin),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}