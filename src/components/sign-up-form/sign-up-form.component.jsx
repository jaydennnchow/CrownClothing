import React, { useContext, useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../routes/utils/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'
import { UserContext } from '../../context/user.component'


const DefaultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpform = () => {

    const [formFields, setFormFields] = useState(DefaultformFields)
    const { displayName, email, password, confirmPassword } = formFields

    const { setCurrentUser } = useContext(UserContext)

    // 表单的双向绑定
    const handleChange = (e) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value })
    }

    // 表单的提交事件
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('password does not match')
            return
        }
        try {
            // 邮箱注册账号
            const response = await createAuthUserWithEmailAndPassword(email, password)
            // 这个 response 和 “SignIn组件中的 const response = await signInWithGooglePopup()”的 一样
            // console.log(response);
            // 把账号存入数据库
            const additionalInformation = { displayName: displayName }
            const userDocRef = await createUserDocumentFromAuth(response.user, additionalInformation)
            if (userDocRef) alert('user created successfully')
            resetFormFields()
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use!')
            }
            console.log('user creation encountered an error', error);
        }
    }

    // 重置表单
    const resetFormFields = () => setFormFields(DefaultformFields)

    return (
        <div className='sign-up-container'>
            <h2>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    type='text'
                    value={displayName}
                    name='displayName'
                    required
                    onChange={handleChange}
                ></FormInput>
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
                <FormInput
                    label='Confirm Password'
                    type='password'
                    required
                    onChange={handleChange}
                    value={confirmPassword}
                    name='confirmPassword'
                ></FormInput>
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpform