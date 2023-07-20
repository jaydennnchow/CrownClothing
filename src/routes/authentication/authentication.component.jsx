import React, { useEffect } from 'react'
import { auth, createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect } from '../utils/firebase.utils'
import { getRedirectResult } from 'firebase/auth'
import SignUpform from '../../components/sign-up-form/sign-up-form.component'
import SignInform from '../../components/sign-in-form/sign-in-form.component'
import './authentication.styles.scss'

const Authentication = () => {

  return (
    <div className='authentication-container'>
      <SignInform></SignInform>
      <SignUpform></SignUpform>
    </div>
  )
}

export default Authentication