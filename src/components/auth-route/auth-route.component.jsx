import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../../store/user/user.selector'

const AuthRoute = ({ children }) => {

    const currentUser = useSelector(getCurrentUser)
    if (currentUser) {
        return <>{children}</>
    } else {
        alert('Please sign in first')
        return <Navigate to={'/auth'}></Navigate>
    }
}

export default AuthRoute