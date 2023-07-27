import React, { useContext, useEffect, useState } from 'react'
import { auth, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signInWithGoogleRedirect } from '../../routes/utils/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import Button from '../button/button.component'
import { getRedirectResult } from 'firebase/auth'
// import { UserContext } from '../../context/user.component'
import { useDispatch } from 'react-redux'
import { emailSiginInStart, googleSiginInStart } from '../../store/user/user.action'


const DefaultformFields = {
    email: '',
    password: '',
}

const SignInform = () => {

    const [formFields, setFormFields] = useState(DefaultformFields)
    const { email, password } = formFields

    // const { setCurrentUser } = useContext(UserContext)
    const dispatch = useDispatch()

    // 表单的双向绑定
    const handleChange = (e) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value })
    }

    // Sign In 按钮的点击事件
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // const response = await signInAuthUserWithEmailAndPassword(email, password)
            // console.log(response);
            // setCurrentUser(response.user)
            dispatch(emailSiginInStart(email,password))
            alert('login success')
            resetFormFields()
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                default:
                    console.log(error);
            }
        }
    }

    // Sign In With Google 按钮的点击事件
    const logGoogleUser = async () => {
        // const response = await signInWithGooglePopup()
        /**
         * response is a object, 里面包含了 一个user属性，是一个对象
         * user 包含的是 经过身份验证后，Google返回的个人信息，包括 access_token
         * 
         */
        // console.log(response);
        // const userDocRef = await createUserDocumentFromAuth(response.user)
        dispatch(googleSiginInStart())
    }

    // Sign in with Google Redirect 按钮的点击事件
    useEffect(() => {
        async function getRes() {
            const response = await getRedirectResult(auth)
            if (response) {
                await createUserDocumentFromAuth(auth, {})
            }
        }
        getRes()
    }, [])

    // 重置表单
    const resetFormFields = () => setFormFields(DefaultformFields)

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type='text'
                    required
                    onChange={handleChange}
                    value={email}
                    name='email'
                ></FormInput>
                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    value={password}
                    name='password'
                ></FormInput>
                <div style={{ display: 'flex', justifyContent: "space-between", flexWrap: "wrap", width: '100%' }}>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={logGoogleUser}>Sign In With Google</Button>
                    <Button type='button' buttonType='inverted' onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInform