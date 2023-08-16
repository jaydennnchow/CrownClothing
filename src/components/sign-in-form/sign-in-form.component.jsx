import React, { useContext, useEffect, useState } from 'react'
import { auth, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signInWithGoogleRedirect } from '../../routes/utils/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import Button from '../button/button.component'
import { getRedirectResult } from 'firebase/auth'
// import { UserContext } from '../../context/user.component'
import { useDispatch, useSelector } from 'react-redux'
import { emailSiginInStart, googleSiginInStart } from '../../store/user/user.action'
import { getCurrentUser, getIsLoading } from '../../store/user/user.selector'
import { useNavigate } from 'react-router-dom'
import { fetchAddressStart } from '../../store/address/address.action'


const DefaultformFields = {
    email: '',
    password: '',
}

const SignInform = () => {

    const [formFields, setFormFields] = useState(DefaultformFields)
    const { email, password } = formFields

    const [isProcessingLogin, setIsProcessingLogin] = useState(false)
    const currentUser = useSelector(getCurrentUser)
    const isLoading = useSelector(getIsLoading)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser) {
            setIsProcessingLogin(false)
            // 成功登录后，就马上获取该用户的所有地址信息
            dispatch(fetchAddressStart({userId: currentUser.id}))
            navigate('/shop', { replace: true })
            return
        }
        if (isLoading === false) {
            setIsProcessingLogin(false)
        }
    }, [currentUser, isLoading])

    // const { setCurrentUser } = useContext(UserContext)

    // 表单的双向绑定
    const handleChange = (e) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value })
    }

    // Sign In 按钮的点击事件
    const handleSubmit = (e) => {
        e.preventDefault()

        // const response = await signInAuthUserWithEmailAndPassword(email, password)
        // console.log(response);
        // setCurrentUser(response.user)
        if (currentUser) {
            alert('already login')
            return
        }
        setIsProcessingLogin(true)
        dispatch(emailSiginInStart(email, password))
        resetFormFields()
    }

    // Sign In With Google 按钮的点击事件
    const signInWithGoogle = async () => {
        // const response = await signInWithGooglePopup()
        /**
         * response is a object, 里面包含了 一个user属性，是一个对象
         * user 包含的是 经过身份验证后，Google返回的个人信息，包括 access_token
         * 
         */
        // console.log(response);
        // const userDocRef = await createUserDocumentFromAuth(response.user)
        if (currentUser) {
            alert('already login')
            return
        }
        setIsProcessingLogin(true)
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
                    <Button type='submit' isLoading={isProcessingLogin}>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle} isLoading={isProcessingLogin}>Sign In With Google</Button>
                    {/* <Button type='button' buttonType='inverted' onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</Button> */}
                </div>
            </form>
        </div>
    )
}

export default SignInform